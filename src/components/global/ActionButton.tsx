import { ConnectionState } from "@/store/useConnections";
import { Button } from "../ui/button";
import { Option } from "@/store/useKronoStore";
import { useCallback } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { onCreateNodeTemplate } from "@/actions/on-create-node-template";
import { onCreateNewPageInDatabase } from "@/actions/on-create-new-page-database";
import { postMessageToSlack } from "@/actions/slack-connection";
import { toast } from "sonner";

const ActionButton = ({ currentService, nodeConnection, channels, setChannels }: { currentService: string, nodeConnection: ConnectionState, channels: Option[], setChannels: (channels: Option[]) => void }) => {
    const pathName = usePathname();

    // sending a message to discord
    const onSendDiscordMessage = useCallback(async () => {
        try {
            if (nodeConnection.discordNode.content === "") {
                toast.error("Please enter a message to send");
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
                toast.success("Message sent successfully to Discord");
            }
        }
        catch (error) {
            console.log("Failed to send message to discord", error);
            toast.error("Failed to send message to Discord");
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
                toast.success("Content stored successfully in Notion");
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to store content in Notion");
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
                toast.success('Message sent successfully')
                nodeConnection.setSlackNode({
                  ...nodeConnection.slackNode,
                  content: "",
                });
                setChannels!([]) // set slack channels to empty after sending a message
            } else {
                toast.error(response.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to send message to Slack");
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
                    toast.success("Discord template saved successfully");
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
                    toast.success("Slack template saved successfully");
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
                    toast.success("Notion template saved successfully");
                }
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to save template");
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