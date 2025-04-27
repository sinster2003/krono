import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be atleast 1 character"
    }),
    email: z.string().min(1, {
        message: "Email is required"
    }).email({
        message: "Email is invalid"
    })
});

export const drawerFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be atleast 1 character"
    }),
    description: z.string().min(1, {
        message: "Description must be atleast 1 character"
    })
});