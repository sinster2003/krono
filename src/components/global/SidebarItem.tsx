import Link from "next/link";
import { ReactNode } from "react";

const SidebarItem = ({ href, pathName, icon, label }: { href: string, pathName: string, icon: ReactNode, label: string }) => {
    return (
        <Link href={href} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${pathName === href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"}`}>
            {icon}
            <span>{label}</span>
        </Link>
    );
}

export default SidebarItem;