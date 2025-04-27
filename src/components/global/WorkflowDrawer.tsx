"use client"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "../ui/button";
import useStore from "@/store";
import DrawerForm from "./DrawerForm";

const WorkflowDrawer = () => {
    const { isOpen, setModalClose } = useStore();

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