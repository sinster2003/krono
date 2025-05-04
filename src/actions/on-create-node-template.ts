"use server";

import { Option } from "@/store/useKronoStore";
import db from "@/lib/db";

export const onCreateNodeTemplate = async (
    content: string,
    type: string,
    workflowId: string,
    channels?: Option[],
    accessToken?: string,
    notionDbId?: string
) => {
    console.log("channels from frontend", channels);
    // discord workflow template
    if (type === "Discord") {
        try {
            const response = await db.workflow.update({
                where: {
                    id: workflowId
                },
                data: {
                    discordTemplate: content
                }
            });

            if (response) {
                return 'Discord template saved'
            }
        }
        catch (error) {
            console.log("Discord node template not created", error);
        }
    }

    // notion workflow template 
    if (type === "Notion") {
        try {
            const response = await db.workflow.update({
                where: {
                    id: workflowId
                },
                data: {
                    notionTemplate: content,
                    notionAccessToken: accessToken,
                    notionDbId: notionDbId,
                }
            });

            if (response) {
                return "Notion template saved";
            }
        }
        catch (error) {
            console.log("Notion node template not created", error);
        }
    }

    // wip: later - slack workflow template
    if (type === "Slack") {
        try {
            const response = await db.workflow.update({
                where: {
                    id: workflowId,
                },
                data: {
                    slackTemplate: content,
                    slackAccessToken: accessToken,
                },
            })

            if (response) {
                const ifUpdated = await db.workflow.update({
                    where: {
                        id: workflowId,
                    },
                    data: {
                        slackChannels: JSON.stringify([])
                    }
                })

                if (ifUpdated) {
                    // wip - reveret if needed
                    const channelList = channels?.map(channel => channel.value);

                    await db.workflow.update({
                        where: {
                            id: workflowId,
                        },
                        data: {
                            slackChannels: JSON.stringify(channelList)
                        }
                    })
                }
            }
        }
        catch (error) {
            console.log("Slack node template not created", error);
        }
    }
}