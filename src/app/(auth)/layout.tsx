import { ReactNode } from "react"

const Layout = ({ children } : { children : ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
        {children}
    </div>
  )
}

export default Layout