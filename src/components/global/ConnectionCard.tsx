import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const ConnectionCard = ({ imageUrl, title, description, connected, type, canvas }: { imageUrl: string, title: string, description: string, connected: {} & any, type: string, canvas?: boolean }) => {
    return (
        <div className={`flex justify-between items-center rounded-xl border hover:bg-primary/5 ${canvas ? "p-7" : "p-4"}`}>
            <div className="flex flex-col gap-3">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={24}
                    height={24}
                />
                <div className="flex flex-col gap-0.5">
                    <p className={`font-bold ${canvas ? "text-sm" : "text-lg"}`}>{title}</p>
                    <p className={`${canvas ? "text-xs w-[90%]" : "text-base"}`}>{canvas && description.length > 60 ? description.slice(0, 60) + "..." : description}</p>
                </div>
            </div>
            {/* if the app is connected */}
            {connected[type] ? <Button variant="default" className="bg-primary hover:opacity-90 cursor-pointer text-white">
                Connected
            </Button> :
                <Link href={
                    title === "Discord"
                        ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT || ""
                        : title === "Notion"
                            ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL || ""
                            : title === "Slack"
                                ? process.env.NEXT_PUBLIC_SLACK_REDIRECT || ""
                                : '#'
                }>
                    <Button variant="default" className="bg-primary hover:opacity-90 cursor-pointer text-white">
                        Connect
                    </Button>
                </Link>
            }
        </div>
    )
}

export default ConnectionCard