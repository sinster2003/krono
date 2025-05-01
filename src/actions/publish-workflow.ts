"use server"

import db from "@/lib/db"

export default async function publishWorkflow(
    flowId: string,
    publish: boolean
) {
    try {
        const response = await db.workflow.update({
            where: {
                id: flowId
            },
            data: {
                publish
            }
        })

        if(response.publish) return "Workflow published successfully";

        return "Workflow unpublished successfully";
    }
    catch(error) {
        console.log(error);
        return false;
    }
}