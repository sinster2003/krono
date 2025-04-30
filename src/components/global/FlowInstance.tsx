"use client"

import useEditor, { EditorNode, EditorEdge } from "@/store/useEditor"
import { Button } from "../ui/button"
import { useCallback, useState } from "react"
import useConnections from "@/store/useConnections"
import createNodesEdges from "@/actions/create-nodes-edges"
import { usePathname } from "next/navigation"
import publishWorkflow from "@/actions/publish-workflow"

const FlowInstance = ({ children, nodes, edges, setNodes, setEdges }: { children: React.ReactNode, nodes: EditorNode[], edges: EditorEdge[], setNodes: (nodes: EditorNode[]) => void, setEdges: (edges: EditorEdge[]) => void }) => {
  const nodeConnections = useConnections();
  const [isFlowPath, setIsFlowPath] = useState([]);
  const pathName = usePathname();
  const { loadEditor} = useEditor()
 
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
            <Button
                onClick={() => {
                    setNodes([]);
                    setEdges([]);
                    loadEditor([], []); // empty in global state
                }}
                disabled={nodes.length < 1}
                className="text-white bg-primary cursor-pointer"
            >
                Reset
            </Button>
        </div>
        {children}
    </div>
  )
}

export default FlowInstance