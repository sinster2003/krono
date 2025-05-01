import { Option } from "@/store/useKronoStore";
import axios from "axios";

export const fetchBotSlackChannels = async (slackAccessToken: string, setSlackChannels: (channels: Option[]) => void) => {
    try {
        // slack api call to fetch the channels
        const url = `https://slack.com/api/conversations.list?${new URLSearchParams({
            types: 'public_channel,private_channel',
            limit: '200',
        })}`

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${slackAccessToken}`
            }
        })

        const data = await response.data;

        if(!data.ok) {
            throw new Error("Failed to fetch channels");
        }

        if(!data.channels.length) {
            return setSlackChannels([]);
        }

        const channels = data.channels.filter((channel: any) => channel.is_member).map((channel: any) => {
            return {
                label: channel.name,
                value: channel.id
            }
        });

        setSlackChannels(channels);
    }
    catch(error) {
        console.log(error);
    }
}
