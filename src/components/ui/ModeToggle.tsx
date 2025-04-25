"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme, theme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // when not mounted - to support ssr
    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="focus:outline-none focus-visible:ring-0 border">
                <Sun className="h-4 w-4" />
            </Button>
        )
    }

    // either system is clicked or normal theme is selected
    const currentTheme = theme === "system" ? systemTheme : theme

    return (
        <div className="fixed bottom-4 left-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="focus:outline-none focus-visible:ring-0 border">
                    {currentTheme === "dark" ? (
                        <Moon className="h-4 w-4" />
                    ) : currentTheme === "light" ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Laptop className="h-4 w-4" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")} className={theme === "light" ? "bg-primary/20" : "hover:text-primary"}>
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "bg-primary/20" : "hover:text-primary"}>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className={theme === "system" ? "bg-primary/20" : "hover:text-primary"}>
                    <Laptop className="h-4 w-4 mr-2" />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    )
}

export default ModeToggle;