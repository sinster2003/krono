import { onGetWorkflows } from "@/actions/get-workflows";
import WorkflowButton from "@/components/global/WorkflowButton"
import WorkflowDrawer from "@/components/global/WorkflowDrawer"
import WorkflowsCard from "@/components/global/WorkflowsCard"

const Workflows = async () => {
    try {
        const workflows = await onGetWorkflows();

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
                        {/* <WorkflowsCard id="1" title="Workflow 1" description="Workflow 1 description" />
                    <WorkflowsCard id="2" title="Workflow 1" description="Workflow 1 description" />
                    <WorkflowsCard id="3" title="Workflow 1" description="Workflow 1 description" />
                    <WorkflowsCard id="4" title="Workflow 1" description="Workflow 1 description" /> */}

                        {workflows === null && (
                            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-8 h-8 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No Workflows Yet</h3>
                                <p className="text-muted-foreground max-w-md">
                                    Create your first workflow to automate your tasks and boost your productivity.
                                </p>
                            </div>
                        )}

                        {
                            // wip: types
                            workflows?.map((workflow: any) => <WorkflowsCard key={workflow.id} id={workflow.id} title={workflow.name} description={workflow.description} />)
                        }

                        <WorkflowDrawer />
                    </div>
                </main>
            </div>
        )
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export default Workflows