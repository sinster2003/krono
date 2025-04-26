import { Activity, Workflow, Network } from 'lucide-react'
import StatCard from '@/components/ui/StatCard';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto my-14">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Workflow}
              title="Total Workflows"
              value="0"
              desc="~ total workflows created"
            />
            <StatCard 
              icon={Network}
              title="Connections"
              value="1"
              desc="~ total connections created"
            />
          </div>

          {/* Recent Activity */}
          <section className="bg-primary/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">New automation created</h3>
                    <p className="text-sm text-muted-foreground">Email sequence automation was created</p>
                  </div>
                  </div>
                  <span className="text-sm text-muted-foreground mr-2">2h ago</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard