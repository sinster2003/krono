"use server"
import db from "@/lib/db";

export async function removeImage(clerkId: string) {
    try {
        await db.user.update({
            where: {
                clerkId
            },
            data: {
                profilePic: ""
            }
        });

        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}