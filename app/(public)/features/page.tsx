"use client"

import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">Features</h1>
            <p className="text-xl text-muted-foreground">
              Discover what makes MockAPI the ideal choice for your mock API needs.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pt-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Quick Setup</h2>
                <p className="text-muted-foreground">
                  Create mock APIs in minutes with our intuitive interface.
                </p>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Realistic Responses</h2>
                <p className="text-muted-foreground">
                  Simulate real API behavior with customizable responses.
                </p>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Team Collaboration</h2>
                <p className="text-muted-foreground">
                  Share your mock APIs with your team for seamless development.
                </p>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">API Documentation</h2>
                <p className="text-muted-foreground">
                  Automatically generate documentation for your mock APIs.
                </p>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Versioning</h2>
                <p className="text-muted-foreground">
                  Keep track of changes with built-in versioning support.
                </p>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Testing Tools</h2>
                <p className="text-muted-foreground">
                  Test your applications against your mock APIs with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-8 px-6 bg-muted">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">MockAPI</h2>
              <p className="text-muted-foreground mt-1">© {new Date().getFullYear()} MockAPI. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 