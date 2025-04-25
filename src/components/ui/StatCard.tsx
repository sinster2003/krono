import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

const StatCard = ({ icon: Icon, title, value, desc }: { icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, title: string, value: string, desc: string }) => (
    <div className="bg-primary/10 p-6 rounded-lg">
            <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Icon className="text-primary h-5 w-5" />
            </div>
        <h3 className="text-2xl font-bold mb-2">{value}</h3>
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <p className="text-xs text-primary">{desc}</p>
    </div>
)

export default StatCard;