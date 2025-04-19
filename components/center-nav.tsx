"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Features", url: "/features" },
  { title: "Pricing", url: "/pricing" },
  { title: "Resources", url: "/resources" },
  { title: "Contact", url: "/contact" },
]

export function CenterNav() {
  const pathname = usePathname()
  
  return (
    <nav className="mx-auto flex items-center justify-center space-x-8">
      {navItems.map((item) => {
        const isActive = pathname === item.url
        
        return (
          <Link
            key={item.title}
            href={item.url}
            className={cn(
              "text font-normal transition-colors hover:opacity-80",
              isActive 
                ? "text-foreground" 
                : "opacity-70"
            )}
            style={{ 
              fontFamily: "Outfit, sans-serif",
              color: isActive ? "#060b25" : "#64748B" ,
              fontSize: "16px"
            }}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
} 