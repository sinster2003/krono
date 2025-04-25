"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "../lib/formSchema"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const FormSection = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: ""
        }
    });

    const formSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data.name, data.email);
    }

    return (
        <div className="max-w-md p-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Update Profile</h2>
                <p className="text-muted-foreground">Welcome back, you are free to update your profile</p>
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
                                        className="h-11 bg-background/50 border focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 hover:bg-background/80 transition-colors" 
                                        placeholder="Name" 
                                        {...field} 
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
                                        className="h-11 bg-background/50 border focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 hover:bg-background/80 transition-colors" 
                                        placeholder="Email" 
                                        type="email" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    <Button 
                        type="submit" 
                        className="w-full h-11 bg-primary hover:opacity-90 transition-colors text-muted-foreground cursor-pointer"
                    >
                        Save Changes
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default FormSection