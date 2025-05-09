export const ConnectionsList = [
    {
        title: "Google Drive",
        description: "Connect your google drive to listen to folder changes.",
        image: "/googleDrive.png",
        connectionKey: 'googleNode', // key to connect the node
        alwaysTrue: true, // if true, the node will always be connected
    },
    {
        title: "Notion",
        description: "Create entries in your notion dashboard and automate tasks.",
        image: "/notion.png",
        connectionKey: 'notionNode',
        accessTokenKey: 'accessToken',
    },
    {
        title: "Slack",
        description: "Use slack to send notifications to team members through your own custom bot.",
        image: "/slack.png",
        connectionKey: 'slackNode',
        accessTokenKey: 'slackAccessToken',
        slackSpecial: true,
    },
    {
        title: "Discord",
        description: "Connect your discord to send notification and messages",
        image: "/discord.png",
        connectionKey: 'discordNode',
        accessTokenKey: 'webhookUrl',
    },
]

export const EditorCanvasCards = [
    {
        type: "Trigger",
        title: "Google Drive",
        description: "Connect with Google drive to trigger actions or to create files and folders.",
        image: "/googleDrive.png",
        nodeType: "googleDrive"
    },
    {
        type: "Action",
        title: "Notion",
        description: "Create entries directly in notion.",
        image: "/notion.png",
        nodeType: "notion"
    },
    {
        type: "Action",
        title: "Slack",
        description: "Send a notification to slack",
        image: "/slack.png",
        nodeType: "slack"
    },
    {
        type: "Action",
        title: "Discord",
        description: "Post messages to your discord server.",
        image: "/discord.png",
        nodeType: "discord"
    }
]