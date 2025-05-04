import Link from "next/link"
import { Button } from "../components/ui/button"
import { Settings } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        {/* Decorative element */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <Settings className="w-24 h-24 text-primary absolute spin-clockwise" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold text-primary">Page Not Found</h2>
        
        <p className="text-muted-foreground max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been removed or the link might be broken.
        </p>

        <div className="pt-4">
          <Link href="/">
            <Button className="h-11 px-6 bg-primary hover:opacity-90 transition-colors text-muted-foreground cursor-pointer">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 

export default NotFound;