import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
    // called when user created or updated in clerk
    try {
        const body =  await req.json();

        if(!body) {
            throw new Error("Something went wrong during authentication");
        }
        
        const { id, email_addresses, first_name, image_url, has_image, last_name } = body?.data;

        const email = email_addresses?.[0]?.email_address;

        // db call to save the user
        const isExistingUser = await db.user.findFirst({
            where: {
                email,
                clerkId: id
            }
        });

        if(!isExistingUser) {
            // create the user 
            await db.user.create({
                data: {
                    clerkId: id,
                    email,
                    name: `${first_name} ${last_name}`,
                    profilePic: has_image ? image_url : ""
                }
            });
        }
        else {
            // update the user name and profile image
            await db.user.update({
                where: {
                    email,
                    clerkId: id
                },
                data: {
                    name: `${first_name} ${last_name}`,
                    profilePic: has_image ? image_url : ""
                }
            });
        }

        return NextResponse.json({ message: "User created or updated" });
    }
    catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong in the webhook!" }, {
            status: 500
        });
    }
}