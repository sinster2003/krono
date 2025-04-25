import Sidebar from "@/components/global/Sidebar"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
            {children}
        </div>
    </div>
  )
}

export default Layout