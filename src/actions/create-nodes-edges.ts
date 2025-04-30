"use server"

import db from "@/lib/db";

export default async function createNodesEdges(
    flowId: string,
    nodes: string,
    edges: string,
    flowPath: string
) {
    try {
        const workflowUpdate = await db.workflow.update({
            where: {
                id: flowId
            },
            data: {
                nodes,
                edges,
                flowPath
            }
        });

        if(workflowUpdate) {
            return true;
        }

        return false;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}

