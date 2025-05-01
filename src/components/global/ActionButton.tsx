import { ConnectionState } from "@/store/useConnections";
import { Button } from "../ui/button";
import { Option } from "@/store/useKronoStore";
import { useCallback } from "react";
import axios from "axios";

const ActionButton = ({ currentService, nodeConnection, channels, setChannels }: { currentService: string, nodeConnection: ConnectionState, channels: Option[], setChannels: (channels: Option[]) => void }) => {

    // sending a message to discord
    const onSendDiscordMessage = useCallback(async () => {
        try {
            if(nodeConnection.discordNode.content === "") {
                return;
            }

            // send a content over to discord via webhookURL
            const response = await axios.post(nodeConnection.discordNode.webhookUrl, {
                content: nodeConnection.discordNode.content
            });
            
            if(response) {
                nodeConnection.setDiscordNode({
                    ...nodeConnection.discordNode,
                    content: ""
                });
            }
        }
        catch(error) {
            console.log("Failed to send message to discord", error);
        }
    }, [nodeConnection.discordNode]);

    // creating a local node template
    // const onCreateLocalNodeTempate = useCallback(() => {
    //     console.log("create local node template");
    // }, []);

    if (currentService === "Discord") {
        return (<>
            <Button
                variant="outline"
                onClick={onSendDiscordMessage}
            >
                Test Message
            </Button>
            <Button
                // onClick={onCreateLocalNodeTempate}
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
                    // onClick={onStoreNotionContent}
                >
                    Test
                </Button>
                <Button
                    // onClick={onCreateLocalNodeTempate}
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
                // onClick={onStoreSlackContent}
              >
                Send Message
              </Button>
              <Button
                // onClick={onCreateLocalNodeTempate}
                variant="outline"
              >
                Save Template
              </Button>
            </>
          )
    }
}

export default ActionButton