"use client"

import Link from 'next/link';
import { CenterNav } from "@/components/center-nav";
import { AuthButton } from "@/components/auth-button";
import { ThemedLogo } from "@/components/themed-logo";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="py-4 px-6 border-b h-20 flex items-center">
        <div className="container mx-auto flex items-center max-w-[1240px]">
          <Link href="/" className="flex items-center gap-2">
            <ThemedLogo size={28} color="#5a63d3" />
            <span 
              className="text-xl font-bold" 
              style={{ 
                color: "#060b25",
                fontFamily: "Outfit, sans-serif" 
              }}
            >
              Mockable
            </span>
          </Link>
          
          <CenterNav />
          
          <div>
            <AuthButton />
          </div>
        </div>
      </header>
      
      {children}
    </>
  );
} 