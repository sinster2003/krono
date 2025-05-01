import { create } from "zustand";

// wip: need to configure setter function types
export type ConnectionProviderProps = {
    discordNode: {
        webhookUrl: string;
        webhookName: string;
        guildName:string;
        content: string;
    };

    googleNode: {}[];

    // wip: types
    notionNode: {
        accessToken: string;
        databaseId: string;
        workspaceName: string;
        content: any;
    };

    slackNode: {
        appId: string;
        authedUserId: string;
        authedUserToken: string;
        slackAccessToken: string;
        botUserId: string;
        teamId: string;
        teamName: string;
        content: string;
    };

    workflowTemplate: {
        discord?: string;
        notion?: string;
        slack?: string;
    };

    loading: boolean;
}

const initialValues: ConnectionProviderProps = {
    discordNode: {
        webhookUrl: "",
        webhookName: "",
        content: "",
        guildName: ""
    },
    notionNode: {
        accessToken: "",
        databaseId: "",
        content: "",
        workspaceName: ""
    },
    googleNode: [],
    slackNode: {
        appId: "",
        authedUserId: "",
        authedUserToken: "",
        slackAccessToken: "", // bot token
        botUserId: "",
        content: "",
        teamId: "",
        teamName: ""
    },
    loading: false,
    workflowTemplate: {
        discord: "",
        slack: "",
        notion: ""
    }
}

export type ConnectionState = ConnectionProviderProps & {
    setGoogleNode: (googleNode: ConnectionProviderProps["googleNode"]) => void,
    setDiscordNode: (discordNode: ConnectionProviderProps["discordNode"]) => void,
    setNotionNode: (notionNode: ConnectionProviderProps["notionNode"]) => void,
    setSlackNode: (slackNode: ConnectionProviderProps["slackNode"]) => void,
    setIsLoading: (loading: boolean) => void,
    setWorkFlowTemplate: (workflowTemplate: ConnectionProviderProps["workflowTemplate"]) => void
};

const useConnections = create<ConnectionState>()((set) => ({
    ...initialValues,
    setGoogleNode: (googleNode: ConnectionProviderProps["googleNode"]) => set(() => ({ googleNode })),
    setDiscordNode: (discordNode: ConnectionProviderProps["discordNode"]) => set(() => ({ discordNode })),
    setNotionNode: (notionNode: ConnectionProviderProps["notionNode"]) => set(() => ({ notionNode })),
    setSlackNode: (slackNode: ConnectionProviderProps["slackNode"]) => set(() => ({ slackNode })),
    setIsLoading: (loading: boolean) => set(() => ({ loading })),
    setWorkFlowTemplate: (workflowTemplate: ConnectionProviderProps["workflowTemplate"]) => set(() => ({ workflowTemplate })),
}));

export default useConnections;