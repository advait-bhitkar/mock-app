"use client"

import { SVGProps } from "react"

export function ThemedLogo({ className, size = 24, color = "#5a63d3", ...props }: SVGProps<SVGSVGElement> & { size?: number, color?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 -960 960 960" 
      fill={color}
      className={className}
      {...props}
    >
      <path d="m480-400-80-80 80-80 80 80-80 80Zm-85-235L295-735l185-185 185 185-100 100-85-85-85 85ZM225-295 40-480l185-185 100 100-85 85 85 85-100 100Zm510 0L635-395l85-85-85-85 100-100 185 185-185 185ZM480-40 295-225l100-100 85 85 85-85 100 100L480-40Z"/>
    </svg>
  )
} 