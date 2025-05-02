"use server";

import { Client } from "@notionhq/client";

export const onCreateNewPageInDatabase = async (databaseId: string, accessToken: string, content: any) => {
    try {
        const notion = new Client({
            auth: accessToken
        });

        const response = await notion.pages.create({
            parent: {
                type: "database_id",
                database_id: databaseId
            },
            properties: {
                name: [
                    {
                        text: {
                            content: content.name
                        }
                    }
                ],
                type: [
                    {
                        text: {
                            content: content.type
                        }
                    }
                ],
                kind: [
                    {
                        text: {
                            content: content.kind
                        }
                    }
                ]
            }
        });

        if(response) {
            return response;
        }

        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}