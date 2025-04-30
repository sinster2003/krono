"use client"

import { EditorNode, EditorEdge } from "@/store/useEditor"
import { Button } from "../ui/button"
import { useCallback, useState } from "react"
import useConnections from "@/store/useConnections"
import createNodesEdges from "@/actions/create-nodes-edges"
import { usePathname } from "next/navigation"
import publishWorkflow from "@/actions/publish-workflow"

const FlowInstance = ({ children, nodes, edges }: { children: React.ReactNode, nodes: EditorNode[], edges: EditorEdge[] }) => {
  const nodeConnections = useConnections();
  const [isFlowPath, setIsFlowPath] = useState([]);
  const pathName = usePathname();
 
  const onFlowAutomation = useCallback(async () => {
    try {
        if(pathName.split("/").pop() !== "undefined") {
            const flow = await createNodesEdges(
                JSON.stringify(pathName.split("/").pop()),
                JSON.stringify(nodes),
                JSON.stringify(edges),
                JSON.stringify(isFlowPath)
            );

            console.log(flow);
        }
    }
    catch(error) {
        console.log(error);
    }
  }, [nodeConnections]); // when theres a change in a node the onFlowAutomation is reinitialized so that new nodes are saved

  const onPublishWorkflow = useCallback(async () => {
    try {
        if(pathName.split("/").pop() !== "undefined") {
            const response = await publishWorkflow(
                JSON.stringify(pathName.split("/").pop()),
                true
            );

            console.log(response);
        }
    }
    catch(error) {
        console.log(error);
    }
  }, []);

  return (
    <div className="flex flex-col gap-3">
        <div className="flex gap-3 p-4">
            <Button
                onClick={onFlowAutomation}
                disabled={isFlowPath.length < 1}
                className="text-white bg-primary"
            >
                Save
            </Button>
            <Button
                onClick={onPublishWorkflow}
                disabled={isFlowPath.length < 1}
                className="text-white bg-primary"
            >
                Publish
            </Button>
        </div>
        {children}
    </div>
  )
}

export default FlowInstance