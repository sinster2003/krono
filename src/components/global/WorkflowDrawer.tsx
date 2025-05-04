"use client"

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import useStore from "@/store";
import DrawerForm from "./DrawerForm";

const WorkflowDrawer = () => {
    const { isOpen } = useStore();

    return (
        <Drawer
            open={isOpen}
        >
            <DrawerContent>
                <DrawerHeader className="flex flex-col items-center justify-center">
                    <DrawerTitle>Create Workflow</DrawerTitle>
                    <DrawerDescription>This action creates a new workflow</DrawerDescription>
                </DrawerHeader>
                <DrawerForm />
            </DrawerContent>
        </Drawer>
    );
}

export default WorkflowDrawer