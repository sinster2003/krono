"use server"

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

// this server connects to discords by accessing the webhook id and storing the webhook id if not present
export const onDiscordConnect = async (
    channel_id: string,
    webhook_id: string,
    webhook_name: string,
    webhook_url: string,
    id: string,
    guild_name: string,
    guild_id: string,
) => {
    try {
        // if webhook id exists
        if (webhook_id) {
            // check if webhook is present for userId
            const webhook = await db.discordWebhook.findFirst({
                where: {
                    userId: id,
                },
                include: {
                    connections: {
                        select: {
                            type: true
                        }
                    }
                }
            });

            // if webhook not present, create one
            if (!webhook) {
                await db.discordWebhook.create({
                    data: {
                        userId: id,
                        webhookId: webhook_id,
                        channelId: channel_id!,
                        guildId: guild_id!,
                        name: webhook_name!,
                        url: webhook_url!,
                        guildName: guild_name!,
                        connections: {
                            create: {
                                userId: id,
                                type: "Discord"
                            }
                        }
                    }
                });
            }

            if (webhook) {
                // check if the webhook is actually present for the target channel id
                const webhookChannel = await db.discordWebhook.findUnique({
                    where: {
                        channelId: channel_id,
                    },
                    include: { // join call
                        connections: {
                            select: {
                                type: true
                            }
                        }
                    }
                });

                //if no webhook for channel create new webhook
                if (!webhookChannel) {
                    await db.discordWebhook.create({
                        data: {
                            userId: id,
                            webhookId: webhook_id,
                            channelId: channel_id!,
                            guildId: guild_id!,
                            name: webhook_name!,
                            url: webhook_url!,
                            guildName: guild_name!,
                            connections: {
                                create: {
                                    userId: id,
                                    type: "Discord",
                                },
                            },
                        },
                    })
                }
            }

            return {
                success: true,
                message: "Successfully connected to Discord"
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to connect to Discord"
        }
    }
}

export const getDiscordConnectionUrl = async () => {
    try {
        const user = await currentUser();
        if (user) {
            const discordUserInformation = await db.discordWebhook.findFirst({
                where: {
                    userId: user?.id
                },
                select: {
                    url: true,
                    name: true,
                    guildName: true
                }
            });

            return discordUserInformation;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

export const postContentToWebHook = async (content: string, url: string) => {
    try {
    console.log(content)
    if (content != '') {
      const posted = await axios.post(url, { content })
      if (posted) {
        return { message: 'success' }
      }
      return { message: 'failed request' }
    }
    return { message: 'String empty' }
    }
    catch (error) {
        console.log(error)
        return { message: 'error' }
    }
}