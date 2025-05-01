import ConnectionCard from "@/components/global/ConnectionCard"
import { ConnectionsList } from "@/lib/constants"
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server"
import { onDiscordConnect } from "@/actions/discord-connection";
import { onNotionConnect } from "@/actions/notion-connection";
import { onSlackConnect } from "@/actions/slack-connection";
import { getUserData } from "@/actions/get-user-data";

const Connections = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
    try {
        const user = await currentUser();
        console.log(user);
        if (!user) {
            return redirect("/sign-in");
        }

        const {
            webhook_id,
            webhook_name,
            webhook_url,
            guild_id,
            guild_name,
            channel_id,
            access_token,
            workspace_name,
            workspace_icon,
            workspace_id,
            database_id,
            app_id,
            authed_user_id,
            authed_user_token,
            slack_access_token,
            bot_user_id,
            team_id,
            team_name,
        } = await searchParams ?? { // wip check if filters is needed
            webhook_id: "",
            webhook_name: "",
            webhook_url: "",
            guild_id: "",
            guild_name: "",
            channel_id: "",
            access_token: "",
            workspace_name: "",
            workspace_icon: "",
            workspace_id: "",
            database_id: "",
            app_id: "",
            authed_user_id: "",
            authed_user_token: "",
            slack_access_token: "",
            bot_user_id: "",
            team_id: "",
            team_name: "",
        }

        // wip: performance
        const userConnections = async () => {
            try {
                // connect to discord and store the webhook id if not present
                await onDiscordConnect(
                    channel_id!,
                    webhook_id!,
                    webhook_name!,
                    webhook_url!,
                    user.id,
                    guild_name!,
                    guild_id!
                );

                // notion
                await onNotionConnect(
                    access_token!,
                    workspace_id!,
                    workspace_icon!,
                    workspace_name!,
                    database_id!,
                    user.id
                )

                // slack
                await onSlackConnect(
                    app_id!,
                    authed_user_id!,
                    authed_user_token!,
                    slack_access_token!,
                    bot_user_id!,
                    team_id!,
                    team_name!,
                    user.id
                )

                // wip: types
                const connections: any = {};

                const userData = await getUserData(user.id);

                // set which app is connected using a boolean
                if(userData) {
                    userData.connections.forEach((connection: { type: string }) => {
                        connections[connection.type] = true;
                    });
                }

                // always true
                return { ...connections, "Google Drive": true };
            }
            catch(error) {
                // add a toast
                console.log("Connection failed", error);
                return null;
            }
        }

        const connections = await userConnections();

        return (
            <div className="flex min-h-screen bg-background">
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto my-14">
                        {/* Header */}
                        <header className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold mb-1">Connections</h1>
                                <p className="text-muted-foreground">Connect your favourite apps and automate them.</p>
                            </div>
                        </header>

                        {/* Connection Cards */}
                        <div className="flex flex-col gap-4">
                            {ConnectionsList.map((connection) => (
                                <ConnectionCard 
                                    key={connection.title} 
                                    title={connection.title} 
                                    description={connection.description} 
                                    imageUrl={connection.image} 
                                    connected={connections} 
                                    type={connection.title} 
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export default Connections