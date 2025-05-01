import { create } from "zustand";

// types of editor node
type EditorCanvasTypes = "discord" | "googleDrive" | "slack" | "notion";

export type EditorCanvasCardType = {
    title: string;
    description: string;
    completed: boolean;
    current: boolean;
    metadata: any;
    type: EditorCanvasTypes;
}

type EditorNodeType = {
    id: string;
    type: EditorCanvasCardType["type"];
    data: EditorCanvasCardType;
    position: {
        x: number;
        y: number;
    }
}

export type EditorEdge = {
    id: string;
    source: string;
    target: string; 
}

export type EditorNode = EditorNodeType;

// type of editor
export type Editor = {
    nodes: EditorNode[];
    edges: EditorEdge[];
    selectedNode: EditorNode | null; // EditorNodeType
}

const initialStates: Editor = {
    nodes: [],
    edges: [],
    selectedNode: {
        id: "",
        type: "googleDrive",
        data: {
            title: "",
            description: "",
            completed: false,
            current: false,
            metadata: {},
            type: "googleDrive"
        },
        position: {
            x: 0,
            y: 0
        }
    }
}

export interface EditorState extends Editor {
    loadEditor: (nodes: EditorNode[], edges: EditorEdge[]) => void;
    updateSelectedNode: (node: EditorNode | null) => void;
    updateNodes: (nodes: EditorNode[]) => void;
    updateEdges: (edges: EditorEdge[]) => void;
}

const useEditor = create<EditorState>()((set) => ({
    // provides states and actions for the editor
    ...initialStates,
    loadEditor: (nodes: EditorNode[], edges: EditorEdge[]) => set(() => ({ nodes, edges })),
    updateSelectedNode: (node: EditorNode | null) => set(() => ({ selectedNode: node })),
    updateNodes: (nodes: EditorNode[]) => set((state: EditorState) => ({ nodes: [...state.nodes, ...nodes] })),
    updateEdges: (edges: EditorEdge[]) => set((state: EditorState) => ({ edges: [...state.edges, ...edges] })),
}));

export default useEditor;