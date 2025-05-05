"use server"
import db from "@/lib/db";

export default async function getPublish(id: string) {
    try {
        const workflow = await db.workflow.findFirst({
            where: {
                id
            },
            select: {
                publish: true
            }
        })

        return workflow;
    }
    catch(error) {
        console.log(error);
    }
}