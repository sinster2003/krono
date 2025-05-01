"use server"

import db from "@/lib/db";

export const getUserData = async (userId: string) => {
    try {
        const user = await db.user.findFirst({
            where: {
                clerkId: userId
            },
            include: {
                connections: true
            }
        });

        return user;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}