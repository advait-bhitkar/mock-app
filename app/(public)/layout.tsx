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
          <Link href="/" className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <rect
                x="2"
                y="2"
                width="28"
                height="28"
                rx="6"
                className="fill-primary/10"
              />
              <path
                d="M13 10L6 16L13 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 10L26 16L19 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 7L15 25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl font-bold text-primary font-outfit">MockAPI</span>
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