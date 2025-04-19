"use client"

import Link from 'next/link';

export default function ResourcesPage() {
  return (
    <>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">Resources</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to get the most out of MockAPI.
            </p>
            
            <div className="grid gap-10 md:grid-cols-2 pt-8">
              {/* Documentation Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Documentation</h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border hover:border-primary transition-colors">
                    <h3 className="font-semibold">Getting Started</h3>
                    <p className="text-sm text-muted-foreground">Learn the basics of creating your first mock API.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border hover:border-primary transition-colors">
                    <h3 className="font-semibold">API Reference</h3>
                    <p className="text-sm text-muted-foreground">Complete reference for the MockAPI API.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border hover:border-primary transition-colors">
                    <h3 className="font-semibold">Configuration Options</h3>
                    <p className="text-sm text-muted-foreground">Learn about all available configuration options.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border hover:border-primary transition-colors">
                    <h3 className="font-semibold">Advanced Features</h3>
                    <p className="text-sm text-muted-foreground">Explore advanced features and use cases.</p>
                  </div>
                </div>
              </div>
              
              {/* Guides Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Guides</h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border hover:border-primary transition-colors">
                    <h3 className="font-semibold">Creating Realistic Mock APIs</h3>
                    <p className="text-sm text-muted-foreground">Learn how to create mock APIs that simulate real-world behavior.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border hover:border-primary transition-colors">
                    <h3 className="font-semibold">Team Collaboration</h3>
                    <p className="text-sm text-muted-foreground">Best practices for using MockAPI in a team environment.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border hover:border-primary transition-colors">
                    <h3 className="font-semibold">Testing Strategies</h3>
                    <p className="text-sm text-muted-foreground">Strategies for testing your application with mock APIs.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border hover:border-primary transition-colors">
                    <h3 className="font-semibold">Integration Examples</h3>
                    <p className="text-sm text-muted-foreground">Examples of integrating MockAPI with different frameworks.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Blog Section */}
            <div className="pt-10">
              <h2 className="text-2xl font-bold mb-4">Latest from our Blog</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border overflow-hidden">
                  <div className="h-40 bg-muted"></div>
                  <div className="p-4">
                    <h3 className="font-semibold">What's New in MockAPI 2.0</h3>
                    <p className="text-sm text-muted-foreground mt-2">Explore the latest features and improvements in our newest release.</p>
                    <p className="text-xs text-muted-foreground mt-4">April 12, 2023</p>
                  </div>
                </div>
                
                <div className="rounded-lg border overflow-hidden">
                  <div className="h-40 bg-muted"></div>
                  <div className="p-4">
                    <h3 className="font-semibold">Best Practices for API Mocking</h3>
                    <p className="text-sm text-muted-foreground mt-2">Learn the best ways to create and manage your mock APIs.</p>
                    <p className="text-xs text-muted-foreground mt-4">March 25, 2023</p>
                  </div>
                </div>
                
                <div className="rounded-lg border overflow-hidden">
                  <div className="h-40 bg-muted"></div>
                  <div className="p-4">
                    <h3 className="font-semibold">Case Study: How Team X Uses MockAPI</h3>
                    <p className="text-sm text-muted-foreground mt-2">See how a leading development team leverages MockAPI in their workflow.</p>
                    <p className="text-xs text-muted-foreground mt-4">February 18, 2023</p>
                  </div>
                </div>
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