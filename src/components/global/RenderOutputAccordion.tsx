"use client";

import useConnections from "@/store/useConnections";
import useEditor from "@/store/useEditor"
import { useKronoStore } from "@/store/useKronoStore";
import ActionBasedOnTitle from "./ActionBasedOnTitle";


const RenderOutputAccordion = () => {
  const editorState = useEditor();
  const connectionsState = useConnections();
  const { setSelectedSlackChannels, selectedSlackChannels, googleFile, setGoogleFile } = useKronoStore();

  return (
    <div>
        <ActionBasedOnTitle
            state={editorState}
            nodeConnection={connectionsState}
            googleFile={googleFile}
            setGoogleFile={setGoogleFile}
            selectedSlackChannels={selectedSlackChannels}
            setSelectedSlackChannels={setSelectedSlackChannels}
        />
    </div>
  )
}

export default RenderOutputAccordion