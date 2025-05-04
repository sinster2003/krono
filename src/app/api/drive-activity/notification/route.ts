
import { postContentToWebHook } from '@/actions/discord-connection'
import { onCreateNewPageInDatabase } from '@/actions/on-create-new-page-database'
import { postMessageToSlack } from '@/actions/slack-connection'
import db from '@/lib/db'
import { headers } from 'next/headers'

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
                const workflow = await db.workflow.findMany({
                    where: {
                        userId: user.clerkId,
                    },
                })

                if (workflow) {
                    workflow.map(async (flow) => {
                        const flowPath = JSON.parse(flow.flowPath!)
                        let current = 0
                        while (current < flowPath.length) {
                            if (flowPath[current] === 'Discord') {
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

                            if (flowPath[current] === 'Slack') {
                                const channels = flow.slackChannels.map((channel) => ({
                                    label: '',
                                    value: channel,
                                }))
                                console.log("Slack here")
                                await postMessageToSlack(flow.slackAccessToken!, channels, flow.slackTemplate!)
                                flowPath.splice(current, 1)
                            }

                            if (flowPath[current] === 'Notion') {
                                await onCreateNewPageInDatabase(
                                    flow.notionDbId!,
                                    flow.notionAccessToken!,
                                    JSON.parse(flow.notionTemplate!)
                                )
                                flowPath.splice(current, 1)
                            }

                            current++
                        }
                    })

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
