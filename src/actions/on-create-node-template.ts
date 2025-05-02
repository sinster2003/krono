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

            if(response) {
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
                const channelList = await db.workflow.findUnique({
                    where: {
                        id: workflowId,
                    },
                    select: {
                        slackChannels: true,
                    },
                });

                if (channelList) {
                    //remove duplicates before insert
                    const NonDuplicated = channelList.slackChannels.filter(
                        (channel) => channel !== channels![0].value
                    )

                    NonDuplicated!
                        .map((channel) => channel)
                        .forEach(async (channel) => {
                            await db.workflow.update({
                                where: {
                                    id: workflowId,
                                },
                                data: {
                                    slackChannels: {
                                        push: channel,
                                    },
                                },
                            })
                        })

                    return "Slack template saved";
                }
            }
        }
        catch (error) {
            console.log("Slack node template not created", error);
        }
    }
}