import { ConnectionState } from "@/store/useConnections"
import { EditorState } from "@/store/useEditor"
import { Option } from "@/store/useKronoStore"
import { AccordionContent } from "../ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import GoogleFileDetails from "./GoogleFileDetails";
import GoogleDriveFiles from "./GoogleDriveFiles";
import ActionButton from "./ActionButton";
import { Shield, MessageSquare, Database, FileText } from "lucide-react";

export const nodeMapper = {
    "Google Drive": "googleNode",
    "Slack": "slackNode",
    "Notion": "notionNode",
    "Discord": "discordNode",
}

type titleType = keyof typeof nodeMapper;

const getServiceIcon = (title: titleType) => {
    switch (title) {
        case "Google Drive":
            return <FileText className="text-primary size-5" />;
        case "Slack":
            return <MessageSquare className="text-primary size-5" />;
        case "Notion":
            return <Database className="text-primary size-5" />;
        case "Discord":
            return <Shield className="text-primary size-5" />;
        default:
            return null;
    }
};

const ActionBasedOnTitle = ({ state, nodeConnection, googleFile, setGoogleFile, selectedSlackChannels, setSelectedSlackChannels }: { state: EditorState, nodeConnection: ConnectionState, googleFile: any, setGoogleFile: (googleFile: any) => void, selectedSlackChannels: Option[], setSelectedSlackChannels: (channels: Option[]) => void }) => {
    const { selectedNode } = state;
    const title = selectedNode?.data.title as titleType;

    console.log(setGoogleFile);

    // check for the node connection type info
    const nodeConnectionType = (nodeConnection as any)[nodeMapper[title]];

    if (!nodeConnectionType) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">Not connected</p>
            </div>
        );
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
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">Not connected</p>
            </div>
        );
    }

    return (
        <AccordionContent>
            <Card className="bg-background/50 border-border/50">
                {title === "Discord" && 
                    <CardHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                            {getServiceIcon(title)}
                            <CardTitle className="text-lg">{nodeConnectionType.webhookURL}</CardTitle>
                        </div>
                        <CardDescription className="text-muted-foreground">{nodeConnectionType.guildName}</CardDescription>
                    </CardHeader>
                }
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-2">
                        {getServiceIcon(title)}
                        <p className="text-lg font-medium">{title === "Notion" ? "Values To Be Stored" : title === "Google Drive" ? "Listener" : "Message"}</p>
                    </div>
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
                            className="bg-background/50 border-border/50 focus:ring-primary/20"
                            placeholder={`Enter your ${title.toLowerCase()} message...`}
                        />
                    )}
                    {
                        JSON.stringify(googleFile) !== "{}" && title !== "Google Drive" && (
                            <Card className="bg-background/30 border-border/30">
                                <CardContent className="p-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <FileText className="text-primary size-4" />
                                            <CardDescription className="text-muted-foreground">Drive File</CardDescription>
                                        </div>
                                        <div className="pl-6">
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

                    <div className="flex gap-4">
                        <ActionButton
                            currentService={title}
                            nodeConnection={nodeConnection}
                            channels={selectedSlackChannels}
                            setChannels={setSelectedSlackChannels}
                        />
                    </div>
                </div>
            </Card>
        </AccordionContent>
    )
}

export default ActionBasedOnTitle