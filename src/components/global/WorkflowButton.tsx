"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import useStore from "@/store"

const WorkflowButton = () => {
    const { setModalOpen, isOpen } = useStore();

    console.log(isOpen);

    return (
        <Button variant="default" className="bg-primary hover:opacity-90 cursor-pointer text-white" onClick={() => setModalOpen()}>
            <Plus className="font-bold" />
        </Button>
    )
}

export default WorkflowButton