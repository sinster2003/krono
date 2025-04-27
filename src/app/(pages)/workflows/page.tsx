import WorkflowButton from "@/components/global/WorkflowButton"
import WorkflowDrawer from "@/components/global/WorkflowDrawer"
import WorkflowsCard from "@/components/global/WorkflowsCard"

const Workflows = () => {
    return (
        <div className="flex min-h-screen bg-background">
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto my-14">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Workflows</h1>
                            <p className="text-muted-foreground">Create your automated workflows</p>
                        </div>
                        <WorkflowButton />
                    </header>
                     {/* add workflows list : wip */}
                    <WorkflowsCard id="1" title="Workflow 1" description="Workflow 1 description" />
                    <WorkflowsCard id="2" title="Workflow 1" description="Workflow 1 description" />
                    <WorkflowsCard id="3" title="Workflow 1" description="Workflow 1 description" />
                    <WorkflowsCard id="4" title="Workflow 1" description="Workflow 1 description" />

                    <WorkflowDrawer />
                </div>
            </main>
        </div>
    )
}

export default Workflows