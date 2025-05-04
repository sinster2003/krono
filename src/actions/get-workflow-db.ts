"use server";

import db from "@/lib/db";

export async function getWorkflowFromDB(workflowId: string) {
    try {
        const workflow = await db.workflow.findUnique({
            where: {
                id: workflowId,
            },
        });

        if(!workflow) {
            return {
                nodes: [],
                edges: [],
            }
        }

        return {
            nodes: workflow.nodes,
            edges: workflow.edges
        }
    }
    catch(error) {
        console.log("Error getting workflow from db", error);
        return {
            nodes: [],
            edges: [],
        }
    }
}