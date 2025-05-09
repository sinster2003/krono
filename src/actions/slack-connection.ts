"use server"

import db from "@/lib/db";
import { Option } from "@/store/useKronoStore";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export const onSlackConnect = async (
    app_id: string,
    authed_user_id: string,
    authed_user_token: string,
    slack_access_token: string,
    bot_user_id: string,
    team_id: string,
    team_name: string,
    user_id: string
) => {
    try {
        if (!slack_access_token) {
            return {
                success: false,
                message: "Failed to connect to Slack"
            };
        }

        const slackConnection = await db.slack.findFirst({
            where: {
                slackAccessToken: slack_access_token
            },
            include: {
                connections: true
            }
        });

        if (!slackConnection) {
            await db.slack.create({
                data: {
                    userId: user_id,
                    appId: app_id,
                    authedUserId: authed_user_id,
                    authedUserToken: authed_user_token,
                    slackAccessToken: slack_access_token,
                    botUserId: bot_user_id,
                    teamId: team_id,
                    teamName: team_name,
                    connections: {
                        create: {
                            userId: user_id,
                            type: 'Slack'
                        },
                    },
                }
            })
        }

        return {
            success: true,
            message: "Successfully connected to Slack"
        }
    }
    catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to connect to Slack"
        }
    }
}

export const getSlackConnectionUrl = async () => {
    try {
        const user = await currentUser();
        if (user) {
            const slackConnection = await db.slack.findFirst({
                where: {
                    userId: user?.id
                }
            })

            if (slackConnection) {
                return slackConnection;
            }
        }

        return null;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}


// sending message to slack channel
const postMessageInSlackChannel = async (
    slackAccessToken: string,
    slackChannel: string,
    content: string
): Promise<void> => {
    try {
        console.log("Message channel", slackChannel, content);
        await axios.post(
            "https://slack.com/api/chat.postMessage",
            { channel: slackChannel, text: content },
            {
                headers: {
                    Authorization: `Bearer ${slackAccessToken}`,
                    "Content-Type": "application/json;charset=utf-8",
                },
            }
        )
        console.log(`Message posted successfully to channel ID: ${slackChannel}`)
    } catch (error: any) {
        console.error(
            `Error posting message to Slack channel ${slackChannel}:`,
            error?.response?.data || error.message
        )
    }
}

// posting message to selected slack channels
export const postMessageToSlack = async (
    slackAccessToken: string,
    selectedSlackChannels: Option[],
    content: string
): Promise<{ message: string }> => {
    try {
        if (!content) return { message: "Content is empty" }
        console.log("content", content, selectedSlackChannels);
        if (!selectedSlackChannels?.length) return { message: "Channel not selected" }
        
        console.log("Selected slack channels", selectedSlackChannels);

        // Wait for all messages to be sent
        await Promise.all(
            selectedSlackChannels
                .map((channel) => channel?.value)
                .map(async (channel) => {
                    try {
                        await postMessageInSlackChannel(slackAccessToken, channel, content);
                    } catch (error) {
                        console.error(`Failed to send message to channel ${channel}:`, error);
                        throw error; // Propagate the error
                    }
                })
        );

        return { message: "Success" }
    } catch (error) {
        console.error("Error in postMessageToSlack:", error);
        return { message: "Failed to send message to Slack" }
    }
}