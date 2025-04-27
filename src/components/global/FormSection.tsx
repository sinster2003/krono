"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "@/lib/schema"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import ProfilePicture from "@/components/ui/ProfilePicture";
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { updateProfile } from "@/actions/update-profile"

const FormSection = () => {
    const { user, isLoaded } =  useUser();
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: ""
        }
    });

    useEffect(() => {
        // make sure the address comes from authenticated email auth address
        form.resetField("email", {
            defaultValue: user?.primaryEmailAddress?.toString()
        });
    }, [isLoaded]);

    const formSubmit = async (data: z.infer<typeof formSchema>) => {
        // server action to update the user name and email
        try {
            setIsSaving(true);

            const isUpdated = await updateProfile(user?.id || "", data);

            if(isUpdated) {
                // successful toast
            }
        }
        catch(error) {
            console.log(error);
            // unsuccessful toast
        }
        finally {
            setIsSaving(false);
        }
    }

    if(!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className="max-w-md p-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Update Profile</h2>
                <p className="text-muted-foreground">Welcome back, you are free to update your profile</p>
            </div>

            <div className="flex flex-col gap-1 mb-6">
                <p className="text-muted-foreground">Update Profile Picture</p>
                <div className="flex w-full items-center justify-center mt-5 mb-2">
                    {/* something like this - <ProfilePicture userImage="https://ucarecdn.com/6e29ebfe-adef-409e-9303-8fce18d81e52/"/> */}
                    <ProfilePicture />
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground/90">Enter your name</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        className="h-11 bg-background/50 border focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 hover:bg-background/80 transition-colors" 
                                        placeholder="Name" 
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground/90">Enter your email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={true}
                                        className="h-11 bg-background/50 border focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 hover:bg-background/80 transition-colors" 
                                        placeholder="Email" 
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit" 
                        className="w-full h-11 bg-primary hover:opacity-90 transition-colors text-muted-foreground cursor-pointer text-white"
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default FormSection