"use client"

import { BarChart3, Network, Settings, Workflow } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <>
        {/* Sidebar */}
        <aside className="w-64 border-r px-6 py-8 hidden md:block">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Settings className="h-6 w-6 text-primary spin-clockwise" />
            <h2 className="font-semibold text-lg">Krono</h2>
          </Link>
          <nav className="space-y-2">
            <SidebarItem href="/dashboard" pathName={pathName} icon= {<BarChart3 className="h-4 w-4" />} label="Dashboard"/>
            <SidebarItem href="/settings" pathName={pathName} icon= {<Settings className="h-4 w-4" />} label="Settings"/>
            <SidebarItem href="/workflows" pathName={pathName} icon= {<Workflow className="h-4 w-4" />} label="Workflows"/>
            <SidebarItem href="/connections" pathName={pathName} icon= {<Network className="h-4 w-4"/>} label="Connections"/>
          </nav>
        </aside>
    </>
  )
}

export default Sidebar