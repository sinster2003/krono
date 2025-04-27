"use server"
import db from "@/lib/db";

export async function fetchUserImage(clerkId: string) {
    try {
        const user = await db.user.findFirst({
            where: {
                clerkId
            }
        });

        if(user && user.profilePic) {
            return user.profilePic;
        }

        return null;
    }
    catch(error) {
        console.log(error);
        return null;
    }
}