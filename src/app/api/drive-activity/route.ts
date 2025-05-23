import { google } from 'googleapis'
import { auth } from '@clerk/nextjs/server'
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import db from '@/lib/db'

export async function GET() {
    try {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.OAUTH2_REDIRECT_URI
        )

        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ message: 'User not found' })
        }

        const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
            userId,
            'oauth_google'
        )

        const accessToken = clerkResponse[0].token
        oauth2Client.setCredentials({
            access_token: accessToken,
        })

        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client,
        })

        // Check if user already has a channel
        /*
        const user = await db.user.findFirst({
            where: {
                clerkId: userId,
            },
            select: {
                googleResourceId: true,
            },
        })

        // If user has an existing channel, stop
        if (user?.googleResourceId) {
            try {
                await drive.channels.stop({
                    requestBody: {
                        id: user.googleResourceId,
                        resourceId: user.googleResourceId,
                    },
                })
            } catch (error) {
                console.log('Error stopping existing channel:', error)
            }
        }
        */

        const channelId = uuidv4()

        const startPageTokenRes = await drive.changes.getStartPageToken({})
        const startPageToken = startPageTokenRes.data.startPageToken
        if (startPageToken == null) {
            throw new Error('startPageToken is unexpectedly null')
        }

        const listener = await drive.changes.watch({
            pageToken: startPageToken,
            supportsAllDrives: true,
            supportsTeamDrives: true,
            requestBody: {
                id: channelId,
                type: 'web_hook',
                address: `${process.env.NGROK_URI}/api/drive-activity/notification`,
                kind: 'api#channel',
            },
        })

        if (listener.status === 200) {
            // Store the new channel ID in db
            const channelStored = await db.user.updateMany({
                where: {
                    clerkId: userId,
                },
                data: {
                    googleResourceId: listener.data.resourceId,
                },
            })

            if (channelStored) {
                return new NextResponse('Listening to changes...')
            }
        }

        return new NextResponse('Oops! something went wrong, try again')
    }
    catch (error) {
        console.log(error);
        return NextResponse.json('Oops! something went wrong, try again');
    }
}
