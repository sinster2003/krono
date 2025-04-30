import { create } from "zustand";

// slack channel type
type Option = {
    value: string;
    label: string;
    disable?: boolean;
    fixed?: boolean;
    [key: string]: string | boolean | undefined; // can be accessed using ["key"] notation
}

type KronoStore = {
    googleFile: any;
    setGoogleFile: (file: any) => void;
    slackChannels: Option[];
    setSlackChannels: (slackChannels: Option[]) => void;
    selectedSlackChannels: Option[];
    setSelectedSlackChannels: (selectedSlackChannels: Option[]) => void;
}

export const useKronoStore = create<KronoStore>()((set) => ({
    googleFile: {},
    setGoogleFile: (file: any) => set({ googleFile: file }),
    slackChannels: [],
    setSlackChannels: (slackChannels: Option[]) => set({ slackChannels }),
    selectedSlackChannels: [],
    setSelectedSlackChannels: (selectedSlackChannels: Option[]) => set({ selectedSlackChannels }),
}));