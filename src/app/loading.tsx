import { Settings } from "lucide-react"

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative w-24 h-24">
        <div className="absolute right-5 top-5">
          <Settings className="w-8 h-8 text-primary/20 spin-clockwise" />
        </div>
        <div className="absolute left-5 bottom-5">
          <Settings className="w-8 h-8 text-primary/20 spin-anticlockwise" />
        </div>
      </div>
    </div>
  )
}

export default Loading;