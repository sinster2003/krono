"use client"

import useEditor, { EditorCanvasCardType, EditorEdge, EditorNode } from "@/store/useEditor";
import { useCallback, useEffect, useMemo, useState } from "react";
import EditorCanvasNodeSingle from "./EditorCanvasNodeSingle";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Controls, Edge, EdgeChange, MiniMap, NodeChange, ReactFlow, ReactFlowInstance } from "@xyflow/react";
import { v4 } from "uuid";
import '@xyflow/react/dist/style.css'
import FlowInstance from "./FlowInstance";
import EditorCanvasSidebar from "./EditorCanvasSidebar";
import { EditorCanvasCards } from "@/lib/constants";

const initialNodes: EditorNode[] = [];;
const initialEdges: EditorEdge[] = [];

const EditorCanvas = () => {
    const editor = useEditor();
    const [nodes, setNodes] = useState<EditorNode[]>(initialNodes);
    const [edges, setEdges] = useState<EditorEdge[]>(initialEdges);
    const [isWorkflowLoading, setIsWorkflowLoading] = useState<boolean>(false);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<EditorNode, EditorEdge> | null>(null);

    // editor handlers
    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        // when node is dropped what needs to happen
        event.preventDefault();
        console.log("dropped")

        // getData from the place where we stored the node information (sidebar)
        const type: EditorCanvasCardType["type"] = event.dataTransfer.getData("application/reactflow") as EditorCanvasCardType["type"];
        if (typeof type === "undefined" || !type) {
            return;
        }

        // check if the node already exists, if yes do not add it again
        const isNodeExist = nodes.some((node) => node.type === type);

        if(isNodeExist) {
            return;
        }

        // if reactFlowInstance is not set, return - reactFlowInstance gives all methods needed to interact with the graph
        if (!reactFlowInstance) {
            return;
        }

        // get the position of the mouse when the node is dropped
        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
        });

        const newNode: EditorNode = {
            id: v4(),
            type,
            position,
            data: {
                title: EditorCanvasCards.find((card) => card.nodeType === type)?.title || type,
                description: EditorCanvasCards.find((card) => card.nodeType === type)?.description || type,
                completed: false,
                current: false,
                metadata: {},
                type,
            }
        }

        setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, editor]);

    // when a node is dragged over, prevent the default behavior and set the drop effect to move    
    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    // when nodes change, apply the changes to the nodes
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            //@ts-ignore
            setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]
    )

    // when edges change, apply the changes to the edges
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            //@ts-ignore
            setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    )

    // when a connection is created, add the edge to the edges
    const onConnect = useCallback(
        // on connection create edge
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        []
    )

    // when the react flow instance is initialized, set the react flow instance 
    const onInit = useCallback((instance: ReactFlowInstance<EditorNode, EditorEdge>) => {
        setReactFlowInstance(instance);
    }, []);

    // nodes types which the app supports
    const nodeTypes = useMemo(() => ({
        "googleDrive": EditorCanvasNodeSingle,
        "notion": EditorCanvasNodeSingle,
        "slack": EditorCanvasNodeSingle,
        "discord": EditorCanvasNodeSingle,
    }), []);

    // as nodes and edges change keep updating the global state
    useEffect(() => {
        editor.loadEditor(nodes, edges);
    }, [nodes, edges]);

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={70}>
                {
                    isWorkflowLoading ?
                        <div className="flex h-full w-full items-center justify-center">
                            <svg
                                aria-hidden="true"
                                className="inline h-8 w-8 animate-spin text-primary/20"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="#e11d48"
                                />
                            </svg>
                        </div>
                        :
                        <div className="flex h-full items-center justify-center">
                            <div className="w-full h-full">
                                <ReactFlow
                                    className="w-full h-full"
                                    onInit={onInit}
                                    nodeTypes={nodeTypes}
                                    nodes={nodes} // might need to be change to global nodes wip
                                    edges={edges} // might need to be change to global egdes wip
                                    onEdgesChange={onEdgesChange}
                                    onNodesChange={onNodesChange}
                                    onConnect={onConnect}
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    fitView
                                    onClick={() => {
                                        editor.updateSelectedNode(null);
                                    }}
                                >
                                    <Controls
                                        position="top-left"
                                        className="bg-background rounded-lg shadow-sm border text-primary"
                                    />
                                    <MiniMap
                                        position="bottom-left"
                                        style={{ background: "#e11d48" }}
                                        pannable
                                        zoomable
                                    />
                                    <Background
                                        //@ts-ignore
                                        variant="dots"
                                        gap={12}
                                        size={1}
                                    />
                                </ReactFlow>
                            </div>
                        </div>
                }
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40} className="border-l">
                {
                    isWorkflowLoading
                        ?
                        <div className="flex h-full w-full items-center justify-center">
                            <svg
                                aria-hidden="true"
                                className="inline h-8 w-8 animate-spin text-primary/20"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="#e11d48"
                                />
                            </svg>
                        </div>
                        :
                        <div className="p-4">
                            {/* Right panel content */}
                            <FlowInstance
                                nodes={editor.nodes}
                                edges={editor.edges}
                                setNodes={setNodes}
                                setEdges={setEdges}
                            >
                                <EditorCanvasSidebar nodes={nodes} />
                            </FlowInstance>
                        </div>
                }
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default EditorCanvas;