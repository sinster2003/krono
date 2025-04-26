import ConnectionCard from "@/components/ui/ConnectionCard"
import { ConnectionsList } from "@/lib/constants"

const Connections = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto my-14">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Connections</h1>
              <p className="text-muted-foreground">Connect your favourite apps and automate them.</p>
            </div>
          </header>
        
          {/* Connection Cards */}
          <div className="flex flex-col gap-4">
            {ConnectionsList.map((connection) => (
                <ConnectionCard key={connection.title} title={connection.title} description={connection.description} imageUrl={connection.image} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Connections