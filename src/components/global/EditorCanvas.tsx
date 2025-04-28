"use client"

import useEditor, { EditorCanvasCardType, EditorEdge, EditorNode } from "@/store/useEditor";
import { useCallback, useMemo, useState } from "react";
import EditorCanvasNodeSingle from "./EditorCanvasNodeSingle";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Controls, Edge, EdgeChange, MiniMap, NodeChange, ReactFlow, ReactFlowInstance } from "@xyflow/react";
import { v4 } from "uuid";
import '@xyflow/react/dist/style.css'

const initialNodes: EditorNode[] = [];;
const initialEdges: EditorEdge[] = [];

const EditorCanvas = () => {
    const editor = useEditor();
    const [nodes, setNodes] = useState<EditorNode[]>(initialNodes);
    const [edges, setEdges] = useState<EditorEdge[]>(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<EditorNode, EditorEdge> | null>(null);

    // editor handlers
    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        // when node is dropped what needs to happen
        event.preventDefault();

        // getData from the place where we stored the node information (sidebar)
        const type: EditorCanvasCardType["type"] = event.dataTransfer.getData("application/reactflow") as EditorCanvasCardType["type"];
        if (typeof type === "undefined" || !type) {
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
                title: type, // need changes
                description: type, // need changes
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
        "Google Drive": EditorCanvasNodeSingle,
        "Notion": EditorCanvasNodeSingle,
        "Slack": EditorCanvasNodeSingle,
        "Discord": EditorCanvasNodeSingle,
    }), []);

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={70}>
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
            </ResizablePanel>
            <ResizablePanel defaultSize={30} className="border-l">
                <div className="p-4">
                    {/* Right panel content */}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default EditorCanvas;