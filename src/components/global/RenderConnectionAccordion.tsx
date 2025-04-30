import useEditor from '@/store/useEditor';
import React from 'react'
import { connectionType } from './SettingsContent';
import useConnections from '@/store/useConnections';
import { useKronoStore } from '@/store/useKronoStore';
import { AccordionContent } from '../ui/accordion';
import MultipleSelector from '../ui/multiple-selector';
import ConnectionCard from './ConnectionCard';

const RenderConnectionAccordion = ({ connection }: { connection: connectionType }) => {
    const { selectedNode } = useEditor();
    const {
        title,
        description,
        image,
        connectionKey,
        accessTokenKey,
        slackSpecial,
        alwaysTrue,
    } = connection;

    const connectionsState = useConnections();
    const { selectedSlackChannels, slackChannels, setSelectedSlackChannels } = useKronoStore(); // to determine the selected and availabel slack channels

    const connectedData = (connectionsState as any)[connectionKey]; // connectionKey -> googleNode, discordNode, notionNode, slackNode

    const isConnected = alwaysTrue ||
        (
            connectedData
            && accessTokenKey
            && connectedData[accessTokenKey]
        ); // get the access token value from the connection state

    return (
        <AccordionContent key={title}>
            {
                selectedNode?.data?.title === title && (
                    <>
                        <ConnectionCard
                            imageUrl={image}
                            title={title}
                            description={description}
                            connected={{[title]: isConnected}} // connected[type] is used to check if the app is connected in connection card
                            type={title}
                            canvas={true}
                        />
                        {/* we are dealing with slack */}
                        {slackSpecial && isConnected && (
                            <div className="p-6">
                                {slackChannels?.length ? (
                                    <>
                                        <div className="mb-4 ml-1">
                                            Select the slack channels to send notification and messages:
                                        </div>
                                        <MultipleSelector
                                            value={selectedSlackChannels}
                                            onChange={setSelectedSlackChannels}
                                            defaultOptions={slackChannels}
                                            placeholder="Select channels"
                                            emptyIndicator={
                                                <p className="text-center text-lg leading-10 text-primary">
                                                    no results found.
                                                </p>
                                            }
                                        />
                                    </>
                                ) : (
                                    'No Slack channels found. Please add your Slack bot to your Slack channel'
                                )}
                            </div>
                        )}
                    </>
                )
            }
        </AccordionContent>
    )
}

export default RenderConnectionAccordion