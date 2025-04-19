"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CenterNav } from '@/components/center-nav';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary">MockAPI</Link>
          
          <CenterNav />
          
          <div>
            <Button variant="outline" className="mr-2" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include core features.
            </p>
            
            <div className="grid gap-8 md:grid-cols-3 pt-12 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="rounded-lg border p-6 flex flex-col">
                <h2 className="text-2xl font-bold">Free</h2>
                <p className="text-4xl font-bold mt-4">$0</p>
                <p className="text-sm text-muted-foreground">Forever</p>
                <ul className="mt-6 space-y-2 flex-grow">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>5 Mock APIs</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Basic response customization</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Community support</span>
                  </li>
                </ul>
                <button className="mt-6 w-full py-2 rounded-md bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
                  Get Started
                </button>
              </div>
              
              {/* Pro Plan */}
              <div className="rounded-lg border p-6 flex flex-col relative bg-primary/5">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
                <h2 className="text-2xl font-bold">Pro</h2>
                <p className="text-4xl font-bold mt-4">$12</p>
                <p className="text-sm text-muted-foreground">per month</p>
                <ul className="mt-6 space-y-2 flex-grow">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>25 Mock APIs</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Advanced customization</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Email support</span>
                  </li>
                </ul>
                <button className="mt-6 w-full py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
              
              {/* Enterprise Plan */}
              <div className="rounded-lg border p-6 flex flex-col">
                <h2 className="text-2xl font-bold">Enterprise</h2>
                <p className="text-4xl font-bold mt-4">$49</p>
                <p className="text-sm text-muted-foreground">per month</p>
                <ul className="mt-6 space-y-2 flex-grow">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Unlimited Mock APIs</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Custom domain support</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>SLA guarantees</span>
                  </li>
                </ul>
                <button className="mt-6 w-full py-2 rounded-md bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
                  Contact Sales
                </button>
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
    </div>
  );
} 