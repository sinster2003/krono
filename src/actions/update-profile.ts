"use server"

import db from "@/lib/db/db";

interface User {
    name: string;
    email: string;
}

export async function updateProfile(clerkId: string, data: User) {
    try {
        await db.user.update({
            where: {
                clerkId
            },
            data: {
                email: data.email,
                name: data.name
            }
        });
        
        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}