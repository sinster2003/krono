
import { postContentToWebHook } from '@/actions/discord-connection'
import { onCreateNewPageInDatabase } from '@/actions/on-create-new-page-database'
import { postMessageToSlack } from '@/actions/slack-connection'
import db from '@/lib/db'
import { headers } from 'next/headers'

// Keep track of recent notifications to prevent duplicates
const recentNotifications = new Map<string, number>();
const DEBOUNCE_WINDOW = 5000; // 5 seconds

export async function POST() {
    try {
        const headersList = await headers()
        let channelResourceId
        headersList.forEach((value, key) => {
            if (key === 'x-goog-resource-id') {
                channelResourceId = value
            }
        })

        if (channelResourceId) {
            const user = await db.user.findFirst({
                where: {
                    googleResourceId: channelResourceId,
                },
                select: { clerkId: true },
            })

            if (user) {
                // Check if this is a duplicate notification
                const now = Date.now();
                const lastNotification = recentNotifications.get(channelResourceId);
                
                if (lastNotification && (now - lastNotification) < DEBOUNCE_WINDOW) {
                    // Skip this notification as it's too close to the last one
                    return Response.json({ message: 'Duplicate notification ignored' }, { status: 200 });
                }
                
                // Update the last notification time
                recentNotifications.set(channelResourceId, now);

                // Clean up old notifications
                for (const [key, timestamp] of recentNotifications.entries()) {
                    if (now - timestamp > DEBOUNCE_WINDOW) {
                        recentNotifications.delete(key);
                    }
                }

                // get all workflows for the user
                const workflow = await db.workflow.findMany({
                    where: {
                        userId: user.clerkId,
                    },
                })

                if (workflow) {
                    workflow.map(async (flow) => {
                        if(flow.publish) {

                        // wip publish only
                        const flowPath = JSON.parse(flow.flowPath!);
                        console.log("Total flowPath", flowPath);

                        let current = 0
                        while (current < flowPath.length) {
                            console.log("flowPath", flowPath);

                            if (flowPath[current] === 'discord') {
                                const discordMessage = await db.discordWebhook.findFirst({
                                    where: {
                                        userId: flow.userId,
                                    },
                                    select: {
                                        url: true,
                                    },
                                })
                                if (discordMessage) {
                                    await postContentToWebHook(flow.discordTemplate!, discordMessage.url)
                                    flowPath.splice(current, 1)
                                }
                            }

                            if (flowPath[current] === 'slack') {
                                const parsedChannels = JSON.parse(flow.slackChannels!);
                                const channels = parsedChannels.map((channel: string) => ({
                                    label: '',
                                    value: channel,
                                }))
                                await postMessageToSlack(flow.slackAccessToken!, channels, flow.slackTemplate!)
                                flowPath.splice(current, 1)
                            }

                            if (flowPath[current] === 'notion') {
                                await onCreateNewPageInDatabase(
                                    flow.notionDbId!,
                                    flow.notionAccessToken!,
                                    JSON.parse(flow.notionTemplate!)
                                )
                                flowPath.splice(current, 1)
                            }

                            // current++
                        }
                    }})
                
                    return Response.json({ message: 'flow completed' }, { status: 200 })
                }
            }
        }

        return Response.json({ message: 'success' }, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: 'error' }, { status: 500 })
    }
}
