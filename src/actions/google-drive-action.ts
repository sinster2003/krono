"use server"

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function googleDriveAction() {
    const { userId } = await auth();

    try {
        const isUserFound = await db.user.findFirst({
            where: {
                clerkId: userId || ""
            },
            select: {
                googleResourceId: true
            }
        })

        if(!isUserFound) {
            return false;
        }
        
        return isUserFound;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}