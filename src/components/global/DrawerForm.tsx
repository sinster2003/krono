"use client"

import { useForm } from "react-hook-form"
import { z } from "zod";
import { drawerFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useStore from "@/store";
import { DrawerFooter } from "../ui/drawer";
import { onCreateWorkflow } from "@/actions/on-create-workflow";
import { useRouter } from "next/navigation";

const DrawerForm = () => {
    const { setModalData, setModalClose } = useStore();
    const form = useForm<z.infer<typeof drawerFormSchema>>({
        resolver: zodResolver(drawerFormSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const handleSubmit = async (data: z.infer<typeof drawerFormSchema>) => {
        try {
            setModalData(data);
            const workflow = await onCreateWorkflow(data);
            if(!workflow) {
                // toast.error("Failed to create workflow"); wip
                return;
            }

            // toast.success("Workflow created successfully");
            setModalClose();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
                <div className="flex items-center justify-center my-4">
                    <div className="w-2xl flex flex-col gap-6 items-center justify-center">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-foreground/90">Enter the workflow name</FormLabel>
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
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-foreground/90">Enter the workflow description</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="h-11 bg-background/50 border focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 hover:bg-background/80 transition-colors"
                                            placeholder="Description"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex flex-col gap-2">
                            <Button variant="outline" type="submit" className="w-full cursor-pointer bg-primary text-white hover:opacity-90">
                                Submit
                            </Button>
                            <DrawerFooter className="p-0">
                                <Button variant="outline" className="w-full cursor-pointer hover:opacity-90" onClick={() => setModalClose()}>
                                    Cancel
                                </Button>
                            </DrawerFooter>
                        </div>
                    </div>
                </div>

            </form>
        </Form>
    )
}

export default DrawerForm