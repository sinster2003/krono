"use client"

import useEditor from "@/store/useEditor"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { ConnectionsList } from "@/lib/constants";
import RenderConnectionAccordion from "./RenderConnectionAccordion";

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
    const { selectedNode } = useEditor();

    if (!selectedNode?.data.title) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-center my-4 text-lg font-bold">
                {selectedNode?.data.title}
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
            </Accordion>
        </div>
    )
}

export default SettingsContent