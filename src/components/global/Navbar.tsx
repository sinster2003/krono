import Link from "next/link";
import { Button } from "../ui/button";
import { LayoutDashboard, Settings } from 'lucide-react';

const Navbar = () => {
    return <header className="grid grid-cols-12 items-center p-10 w-full">
        <aside className="flex items-center justify-start col-span-2">
            <div className="text-3xl font-extrabold flex items-center tracking-wider">Kr<Settings size={20} className="text-primary mt-1 spin-clockwise"/>n<Settings size={20} className="text-primary mt-1 spin-anticlockwise"/></div>
        </aside>
        <nav className="col-span-8 flex items-center justify-center">
            <ul className="flex items-center gap-6">
                <li className="hover:text-primary">
                    <Link href="">
                        Products
                    </Link>
                </li>
                <li className="hover:text-primary">
                    <Link href="">
                        Pricing
                    </Link>
                </li>
                <li className="hover:text-primary">
                    <Link href="">
                        Clients
                    </Link>
                </li>
                <li className="hover:text-primary">
                    <Link href="">
                        Resources
                    </Link>
                </li>
                <li className="hover:text-primary">
                    <Link href="">
                        Documentation
                    </Link>
                </li>
                <li className="hover:text-primary">
                    <Link href="">
                        Enterprise
                    </Link>
                </li>
            </ul>
        </nav>
        <aside className="flex items-center justify-end col-span-2">
            <Button variant="default" className="cursor-pointer">
                <div className="flex items-center gap-2">
                    <LayoutDashboard /> <span>Dashboard</span>
                </div>
            </Button>
        </aside>
    </header>
}

export default Navbar;