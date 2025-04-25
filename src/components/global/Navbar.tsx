import Link from "next/link";
import { Button } from "../ui/button";
import { LayoutDashboard, MenuIcon, Settings } from 'lucide-react';

const Navbar = () => {
    return <header className="grid grid-cols-12 items-center p-10 w-full">
        <aside className="flex items-center justify-start md:col-span-2 col-span-6">
            <div className="text-3xl font-extrabold flex items-center tracking-wider">Kr<Settings size={20} className="text-primary mt-1 spin-clockwise"/>n<Settings size={20} className="text-primary mt-1 spin-anticlockwise"/></div>
        </aside>
        <nav className="col-span-8 md:flex items-center justify-center hidden">
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
        <aside className="flex items-center justify-end md:col-span-2 gap-2 col-span-6">
            <Link href="/dashboard">
            <Button variant="default" className="cursor-pointer hover:opacity-90">
                <div className="flex items-center gap-3 text-white">
                    {/* need to wire up a user */}
                    <LayoutDashboard /> <span>Dashboard</span> 
                </div>
            </Button>
            </Link>
            {/* responsiveness - hamburger */}
            <div className="md:hidden">
                <MenuIcon />
            </div>
        </aside>
    </header>
}

export default Navbar;