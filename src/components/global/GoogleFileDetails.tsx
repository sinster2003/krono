import { ConnectionState } from "@/store/useConnections"
import { Card, CardContent, CardDescription } from "../ui/card";

const isGoogleFileNotEmpty = (gFile: any) => {
  return Object.keys(gFile).length > 0 && gFile.kind !== "";
}

const GoogleFileDetails = ({ title, nodeConnection, gFile } : { title: string, nodeConnection: ConnectionState, gFile: any }) => {
  // custom messages template on discord and slack using google drive file details
  if(!isGoogleFileNotEmpty(gFile)) {
    return <p>No file selected</p>
  }

  const details = ["kind", "name", "mimeType"];
  if(title === "Google Drive") {
    details.push("id");
  }
  
//   wip: styling
  return (
    <div>
        <Card>
            <CardContent>
                {
                    details.map((detail) => (
                        <div
                            key={detail}
                            onClick={() => {
                              if(title === "Slack") {
                                nodeConnection.setSlackNode({
                                    ...nodeConnection.slackNode,
                                    content: `${nodeConnection.slackNode.content} ${gFile[detail]}`
                                })
                              }
                              else if(title === "Discord") {
                                nodeConnection.setDiscordNode({
                                    ...nodeConnection.discordNode,
                                    content: `${nodeConnection.discordNode.content} ${gFile[detail]}`
                                })
                              }
                            }}
                        >
                            {detail}: {' '}
                            <CardDescription>
                                {gFile[detail]}
                            </CardDescription>
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    </div>
  )
}

export default GoogleFileDetails