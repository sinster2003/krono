// fetch the connection information from the database and populates it in the global connection state

import { getDiscordConnectionUrl } from "@/actions/discord-connection";
import { getNotionConnectionUrl, getNotionDatabase } from "@/actions/notion-connection";
import { getSlackConnectionUrl } from "@/actions/slack-connection";
import { ConnectionState } from "@/store/useConnections";
import { EditorState } from "@/store/useEditor";

export const onConnections = async (state: EditorState, googleFile: any, nodeConnections: ConnectionState) => {
    try {
       if(state.selectedNode?.data.title === "Discord") {
        const discordInformation = await getDiscordConnectionUrl();
        if(discordInformation) {
            nodeConnections.setDiscordNode({
                webhookName: discordInformation.name,
                webhookUrl: discordInformation.url,
                guildName: discordInformation.guildName,
                content: ""
            })
        }
       } 

       if(state.selectedNode?.data.title === "Notion") {
        const notionInformation = await getNotionConnectionUrl();
        if(notionInformation) {
            nodeConnections.setNotionNode({
               accessToken: notionInformation.accessToken,
               databaseId: notionInformation.databaseId,
               workspaceName: notionInformation.workspaceName,
               content: {
                name: googleFile.name,
                type: googleFile.mimeType,
                kind: googleFile.kind,
               }
            });

            if (nodeConnections.notionNode.databaseId !== "") {
                await getNotionDatabase(
                    nodeConnections.notionNode.databaseId, 
                    nodeConnections.notionNode.accessToken
                );
            }
        }
       }

       if(state.selectedNode?.data.title === "Slack") {
        const slackInformation = await getSlackConnectionUrl();
        if(slackInformation) {
            nodeConnections.setSlackNode({
                appId: slackInformation.appId,
                authedUserId: slackInformation.authedUserId,
                authedUserToken: slackInformation.authedUserToken,
                slackAccessToken: slackInformation.slackAccessToken,
                botUserId: slackInformation.botUserId,
                teamId: slackInformation.teamId,
                teamName: slackInformation.teamName,
                // userId: slackInformation.userId, wip
                content: ""
            })
        }
       }
    }
    catch(error) {
        console.log(error);
    }
}