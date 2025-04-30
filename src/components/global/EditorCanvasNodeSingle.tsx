"use client"

import useEditor, { EditorCanvasCardType } from '@/store/useEditor'
import { Position, useNodeId } from '@xyflow/react';
import { useMemo } from 'react';
import EditorCanvasIcon from './EditorCanvasIcon';
import CustomHandle from './CustomHandle';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const EditorCanvasNodeSingle = ({ data }: { data: EditorCanvasCardType }) => {
    const { nodes, updateSelectedNode } = useEditor();
    const { title, description, type } = data; // destructure data -> data of the node
    const nodeId = useNodeId(); // id of the node

    const logo = useMemo(() => {
        return <EditorCanvasIcon type={type} />
    }, [data]); // based on data as data reload the logo

    return (
        <>
            {/* improvement needed: current google drive node acts as a trigger but in the later version there should be an
    option to choose trigger and based on trigger state we can decide the custom handle */}
            {type !== "googleDrive" &&
                <CustomHandle
                    type="target"
                    position={Position.Top}
                />
            }
            <Card
                onClick={(e) => {
                    e.stopPropagation()
                    const currNode = nodes.find((n) => n.id === nodeId)
                    if (currNode) {
                        updateSelectedNode(currNode);
                    }
                }}
                className="relative w-[400px] bg-primary/10"
                style={{
                    borderColor: "#e11d48"
                }}
            >
                <CardHeader className="flex flex-row items-center gap-4">
                    <div>{logo}</div>
                    <div>
                        <CardTitle className="text-md">{title}</CardTitle>
                        <CardDescription>
                            <p className="text-xs text-muted-foreground/50">
                                <b className="text-muted-foreground/80">ID: </b>
                                {nodeId}
                            </p>
                            <p>{description}</p>
                        </CardDescription>
                    </div>
                </CardHeader>
                <Badge
                    variant="secondary"
                    className="absolute right-2 top-2"
                >
                    {type}
                </Badge>
                <div
                    className={`absolute left-3 top-4 h-2 w-2 rounded-full bg-green-500`}
                ></div>
            </Card >
            <CustomHandle
                type="source"
                position={Position.Bottom}
            />
        </>
    )
}

export default EditorCanvasNodeSingle