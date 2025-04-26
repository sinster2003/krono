import Image from "next/image";
import { Button } from "./button";

const ConnectionCard = ({ imageUrl, title, description } : { imageUrl: string, title: string, description: string }) => {
  return (
    <div className="flex justify-between items-center p-7 rounded-xl border hover:bg-primary/5">
        <div className="flex flex-col gap-3">
            <Image
                src={imageUrl}
                alt={title}
                width={24}
                height={24}
            />
            <div className="flex flex-col gap-0.5">
                <p className="text-lg font-bold">{title}</p>
                <p className="text-base">{description}</p>
            </div>
        </div>
        <Button variant="default" className="bg-primary hover:opacity-90 cursor-pointer text-white">
            Connect
        </Button>
    </div>
  )
}

export default ConnectionCard