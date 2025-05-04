"use server"
import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export const onCreateWorkflow = async (data: {
    name: string;
    description: string;
}) => {
    try {
        const user = await currentUser();
        if(!user) {
            return null;
        }

        const workflow = await db.workflow.create({
            data: {
                userId: user.id,
                name: data.name,
                description: data.description,
                flowPath: ""
            }
        });

        return workflow;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}