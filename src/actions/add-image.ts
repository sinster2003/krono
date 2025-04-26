"use server"

import db from "@/lib/db/db";

export async function addImage(clerkId: string, cdnUrl: string) {
    try {
        await db.user.update({
            where: {
                clerkId
            },
            data: {
                profilePic: cdnUrl
            }
        });

        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}