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