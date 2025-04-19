"use client"

import Link from 'next/link';
import { CenterNav } from "@/components/center-nav";
import { AuthButton } from "@/components/auth-button";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary font-outfit">MockAPI</Link>
          
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