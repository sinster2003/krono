"use client"

import useEditor from "@/store/useEditor";
import { Handle, HandleProps } from "@xyflow/react"

const CustomHandle = (props: HandleProps) => {
  const { edges } = useEditor();

  return (
    <Handle
        {...props}
        style={{ zIndex: 100 }}
        isValidConnection={(e) => {
            const sourceEdgeLength = edges.filter(edge => edge.source === e.source).length;
            const targetEdgeLength = edges.filter(edge => edge.target === e.target).length;

            if(targetEdgeLength >= 1) return false;
            // if adding condition node might be return true base sourceNode.type
            if(sourceEdgeLength < 1) return true;
            return false;
        }}
    />  
  )
}

export default CustomHandle