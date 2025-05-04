import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const slackAccessToken = searchParams.get('slackAccessToken');

        if (!slackAccessToken) {
            return NextResponse.json(
                { error: 'Slack access token is required' },
                { status: 400 }
            );
        }

        // slack api call to fetch the channels
        const url = `https://slack.com/api/conversations.list?${new URLSearchParams({
            types: 'public_channel,private_channel',
            limit: '200',
        })}`

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${slackAccessToken}`
            }
        });

        const data = response.data;

        if (!data.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch channels from Slack' },
                { status: 500 }
            );
        }

        if (!data.channels?.length) {
            return NextResponse.json([]);
        }

        const channels = data.channels
            .filter((channel: any) => channel.is_member)
            .map((channel: any) => ({
                label: channel.name,
                value: channel.id
            }));

        return NextResponse.json(channels);
    } catch (error) {
        console.error('Error fetching Slack channels:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}