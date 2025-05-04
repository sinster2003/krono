import { ConnectionState } from "@/store/useConnections"
import { EditorState } from "@/store/useEditor"
import { Option } from "@/store/useKronoStore"
import { AccordionContent } from "../ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import GoogleFileDetails from "./GoogleFileDetails";
import GoogleDriveFiles from "./GoogleDriveFiles";
import ActionButton from "./ActionButton";

export const nodeMapper = {
    "Google Drive": "googleNode",
    "Slack": "slackNode",
    "Notion": "notionNode",
    "Discord": "discordNode",
}

type titleType = keyof typeof nodeMapper;

const ActionBasedOnTitle = ({ state, nodeConnection, googleFile, setGoogleFile, selectedSlackChannels, setSelectedSlackChannels }: { state: EditorState, nodeConnection: ConnectionState, googleFile: any, setGoogleFile: (googleFile: any) => void, selectedSlackChannels: Option[], setSelectedSlackChannels: (channels: Option[]) => void }) => {
    const { selectedNode } = state;
    const title = selectedNode?.data.title as titleType;

    console.log(setGoogleFile);

    // check for the node connection type info
    const nodeConnectionType = (nodeConnection as any)[nodeMapper[title]];

    if (!nodeConnectionType) {
        return <p>Not connected</p>
    }

    // check if connection token is there or not
    let isConnected = false;

    if (title === 'Google Drive') {
        isConnected = !nodeConnection.loading;
    } else {
        const keyMap = {
            Slack: 'slackAccessToken',
            Discord: 'webhookURL',
            Notion: 'accessToken',
        };

        const key = keyMap[title] || '';
        isConnected = !!nodeConnectionType[key]; // check if present and truthy
    }

    if(!isConnected) {
        return <p>Not connected</p>
    }

    return (
        <AccordionContent>
            <Card>
                {title === "Discord" && 
                    <CardHeader>
                        <CardTitle>{nodeConnectionType.webhookURL}</CardTitle>
                        <CardDescription>{nodeConnectionType.guildName}</CardDescription>
                    </CardHeader>
                }
                <div>
                    <p className="text-center">{title === "Notion" ? "Values To Be Stored" : "Message"}</p>
                    {title === "Discord" || title === "Slack" && (
                        <Input
                            type="text"
                            value={nodeConnectionType.content}
                            onChange={(e) => {
                                if(title === "Slack") {
                                    nodeConnection.setSlackNode({
                                        ...nodeConnectionType,
                                        content: e.target.value,
                                    });
                                }
                                else {
                                    nodeConnection.setDiscordNode({
                                        ...nodeConnectionType,
                                        content: e.target.value,
                                    });
                                }
                            }}
                        />
                    )}
                    {/* when the title is not google drive, and google file is not empty */}
                    {/* wip: styling */}
                    {
                        JSON.stringify(googleFile) !== "{}" && title !== "Google Drive" && (
                            <Card>
                                <CardContent>
                                    <div>
                                        <CardDescription>Drive File</CardDescription>
                                        <div>
                                            <GoogleFileDetails
                                                gFile={googleFile}
                                                title={title}
                                                nodeConnection={nodeConnection}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    }
                    {
                        title === "Google Drive" && (
                            <GoogleDriveFiles />
                        )
                    }

                    <ActionButton
                        currentService={title}
                        nodeConnection={nodeConnection}
                        channels={selectedSlackChannels}
                        setChannels={setSelectedSlackChannels}
                    />
                </div>
            </Card>
        </AccordionContent>
    )
}

export default ActionBasedOnTitle