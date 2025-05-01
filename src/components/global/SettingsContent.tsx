"use client"

import useEditor from "@/store/useEditor"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { ConnectionsList } from "@/lib/constants";
import RenderConnectionAccordion from "./RenderConnectionAccordion";
import RenderOutputAccordion from "./RenderOutputAccordion";
import { useKronoStore } from "@/store/useKronoStore";
import { useEffect } from "react";
import useConnections from "@/store/useConnections";
import { onConnections } from "@/lib/onConnections";
import { fetchBotSlackChannels } from "@/lib/fetchBotSlackChannels";

export type connectionType = {
    title: string;
    description: string;
    image: string;
    connectionKey: string;
    accessTokenKey?: string;
    slackSpecial?: boolean;
    alwaysTrue?: boolean;
}

const SettingsContent = () => {
    const state = useEditor();
    const { googleFile, setSlackChannels } = useKronoStore();
    const nodeConnections = useConnections();

    useEffect(() => {
        if(state) {
            // sets the connections in the global state by fetching from the database
            onConnections(state, googleFile, nodeConnections);
        }
    }, [state]);

    useEffect(() => {
        if(nodeConnections.slackNode.slackAccessToken) {
            // fetching the slack bot channels for the slack connection
            fetchBotSlackChannels(nodeConnections.slackNode.slackAccessToken, setSlackChannels);
        }
    }, [nodeConnections]);

    if (!state.selectedNode?.data.title) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-center my-4 text-lg font-bold">
                {state.selectedNode?.data.title}
            </div>
            <Accordion type="multiple">
                <AccordionItem value="Options">
                    <AccordionTrigger>
                        Account
                    </AccordionTrigger>
                    {/* traverse throught the connections list and render the accordion item */}
                    {ConnectionsList.map((connection: connectionType) =>
                        <RenderConnectionAccordion
                            key={connection.title}
                            connection={connection}
                        />
                    )}
                </AccordionItem>
                <AccordionItem value="Expected Output">
                    <AccordionTrigger className="">
                        Action
                    </AccordionTrigger>
                    <RenderOutputAccordion />
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default SettingsContent