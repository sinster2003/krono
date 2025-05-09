"use server"

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Client } from "@notionhq/client";

export const onNotionConnect = async (
    access_token: string,
    workspace_id: string,
    workspace_icon: string,
    workspace_name: string,
    database_id: string,
    id: string
) => {
    try {
        if(access_token) {
            // check if notion connection to the user exists
            const notionConnected = await db.notion.findFirst({
                where: {
                    accessToken: access_token
                },
                include: {
                    connections: {
                        select: {
                            type: true
                        }
                    }
                }
            });

            if(!notionConnected) {
                // if notion not connected, create a new one
                await db.notion.create({
                    data: {
                        userId: id,
                        workspaceIcon: workspace_icon!,
                        accessToken: access_token,
                        workspaceId: workspace_id!,
                        workspaceName: workspace_name!,
                        databaseId: database_id,
                        connections: {
                            create: {
                                userId: id,
                                type: 'Notion',
                            },
                        },
                    }
                })
            }

            return {
                success: true,
                message: "Successfully connected to Notion"
            }
        }
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to connect to Notion"
        }
    }
}

// fetch data of notion based on the authenticate user
export const getNotionConnectionUrl = async () => {
    try {
        const user = await currentUser();
        if (user) {
            const notionUserInformation = await db.notion.findFirst({
                where: {
                    userId: user?.id
                }
            });

            return notionUserInformation;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

// fetch database data of notion based on the database id and access token
export const getNotionDatabase = async (databaseId: string, accessToken: string) => {
    try {
        const notionDatabase = new Client({
            auth: accessToken
        });

        // database retrieval
        const response = await notionDatabase.databases.retrieve({
            database_id: databaseId
        });

        return response;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}