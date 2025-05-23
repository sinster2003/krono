import { EditorCanvasCards } from "@/lib/constants"
import { Card, CardHeader } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Image from "next/image"
import { EditorNode } from "@/store/useEditor"
import SettingsContent from "./SettingsContent"

const EditorCanvasSidebar = ({ nodes }: { nodes: EditorNode[] }) => {
    
    return (
        <aside className="w-full p-4">
            <Tabs defaultValue="actions" className="w-full">
                <TabsList className="w-full gap-2">
                    <TabsTrigger value="actions" className="flex-1 shadow-none">Actions</TabsTrigger>
                    <TabsTrigger value="settings" className="flex-1 shadow-none">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="actions" className="mt-4 space-y-4">
                    {
                        // map through the cards and filter them based on type
                        Object.entries(EditorCanvasCards).filter(([_, card]) =>
                            // if there are no nodes in the canvas then only show triggers
                            !nodes.length && card.type === "Trigger" ||
                            // if there are nodes in the canvas then only show actions
                            nodes.length && card.type === "Action").map(([key, card]) => {
                                return (
                                    <Card
                                        key={key}
                                        draggable
                                        className="hover:bg-primary/5 transition-colors cursor-pointer shadow-none"
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData("application/reactflow", card.nodeType);
                                            e.dataTransfer.effectAllowed = "move";
                                        }}
                                    >
                                        <CardHeader className="flex flex-row items-center gap-4">
                                            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <Image
                                                    src={card.image}
                                                    alt={card.title}
                                                    width={20}
                                                    height={20}
                                                />
                                            </div>
                                            <div className="w-3/4">
                                                <h3 className="font-semibold">{card.title}</h3>
                                                <p className="text-sm text-muted-foreground">{card.description}</p>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                )
                            })
                    }
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsContent />
                </TabsContent>
            </Tabs>
        </aside>
    )
}

export default EditorCanvasSidebar