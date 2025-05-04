"use server"

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onGetWorkflows = async () => {
    try {
        const user = await currentUser();
        const workflows = await db.workflow.findMany({
            where: {
                userId: user?.id
            }
        })

        if(!workflows.length) {
            return null;
        }

        return workflows;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}