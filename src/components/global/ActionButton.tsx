import { ConnectionState } from "@/store/useConnections";
import { Button } from "../ui/button";
import { Option } from "@/store/useKronoStore";
import { useCallback } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { onCreateNodeTemplate } from "@/actions/on-create-node-template";
import { onCreateNewPageInDatabase } from "@/actions/on-create-new-page-database";
import { postMessageToSlack } from "@/actions/slack-connection";

const ActionButton = ({ currentService, nodeConnection, channels, setChannels }: { currentService: string, nodeConnection: ConnectionState, channels: Option[], setChannels: (channels: Option[]) => void }) => {
    const pathName = usePathname();

    // sending a message to discord
    const onSendDiscordMessage = useCallback(async () => {
        try {
            if (nodeConnection.discordNode.content === "") {
                return;
            }

            // send a content over to discord via webhookURL
            const response = await axios.post(nodeConnection.discordNode.webhookUrl, {
                content: nodeConnection.discordNode.content
            });

            if (response) {
                nodeConnection.setDiscordNode({
                    ...nodeConnection.discordNode,
                    content: ""
                });
            }
        }
        catch (error) {
            console.log("Failed to send message to discord", error);
        }
    }, [nodeConnection.discordNode]);

    // storing the content in notion
    const onStoreNotionContent = useCallback(async () => {
        try {
            const response = await onCreateNewPageInDatabase(
                nodeConnection.notionNode.databaseId,
                nodeConnection.notionNode.accessToken,
                nodeConnection.notionNode.content
            )

            if (response) {
                nodeConnection.setNotionNode({
                    ...nodeConnection.notionNode,
                    content: {
                        name: "",
                        kind: "",
                        type: ""
                    }
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }, [nodeConnection.notionNode]);

    // posting a message to slack
    const onStoreSlackContent = useCallback(async () => {
        try {
            const response = await postMessageToSlack(
                nodeConnection.slackNode.slackAccessToken,
                channels!,
                nodeConnection.slackNode.content
              )

            if (response.message == "Success") {
                // toast.success('Message sent successfully') wip add a toast
                nodeConnection.setSlackNode({
                  ...nodeConnection.slackNode,
                  content: "",
                });
                setChannels!([]) // set slack channels to empty after sending a message
            } else {
                // toast.error(response.message) wip add a toast
            }
        }
        catch (error) {
            console.log(error);
        }
    }, [nodeConnection.slackNode]);

    // creating a local node template
    const onCreateLocalNodeTempate = useCallback(async () => {
        try {
            if (currentService === "Discord") {
                const response = await onCreateNodeTemplate(
                    nodeConnection.discordNode.content,
                    currentService,
                    pathName.split("/").pop() || ""
                );

                if (response) {
                    // add a toast
                }
            }

            if (currentService === "Slack") {
                const response = await onCreateNodeTemplate(
                    nodeConnection.slackNode.content,
                    currentService,
                    pathName.split("/").pop() || "",
                    channels,
                    nodeConnection.slackNode.slackAccessToken
                );

                if (response) {
                    // add a toast
                }
            }

            if (currentService === "Notion") {
                const response = await onCreateNodeTemplate(
                    JSON.stringify(nodeConnection.slackNode.content),
                    currentService,
                    pathName.split("/").pop() || "",
                    [],
                    nodeConnection.notionNode.accessToken,
                    nodeConnection.notionNode.databaseId
                );

                if (response) {
                    // add a toast
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }, [nodeConnection, channels]);

    if (currentService === "Discord") {
        return (<>
            <Button
                variant="outline"
                onClick={onSendDiscordMessage}
            >
                Test Message
            </Button>
            <Button
                onClick={onCreateLocalNodeTempate}
                variant="outline"
            >
                Save Template
            </Button>
        </>
        );
    }

    if (currentService === "Notion") {
        return (
            <>
                <Button
                    variant="outline"
                    onClick={onStoreNotionContent}
                >
                    Test
                </Button>
                <Button
                    onClick={onCreateLocalNodeTempate}
                    variant="outline"
                >
                    Save Template
                </Button>
            </>
        );
    }

    if (currentService === "Slack") {
        return (
            <>
                <Button
                    variant="outline"
                    onClick={onStoreSlackContent}
                >
                    Send Message
                </Button>
                <Button
                    onClick={onCreateLocalNodeTempate}
                    variant="outline"
                >
                    Save Template
                </Button>
            </>
        )
    }
}

export default ActionButton