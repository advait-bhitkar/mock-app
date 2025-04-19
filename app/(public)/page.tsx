"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChart, Clock, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SmarterSalesInsights from '@/components/smarter-sales-insights';

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <SmarterSalesInsights className='mx-auto'/>
            <h2 className="text-[64px] font-medium mb-3 font-outfit">Create and manage mock APIs with ease</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Build, test, and share API mocks for rapid development and seamless collaboration.
              No more waiting for backend implementation.
            </p>
            <Button className="px-8 py-6 text-lg" asChild>
              <Link href={"/login"}>
                {"Get Started For Free"}
              </Link>
            </Button>
          </div>
        </section>
        
        <section className="py-24 bg-[#141a3e]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl text-white font-medium mb-4 font-outfit">How it works</h2>
              <p className="text-xl text-[#FFFFFFBF] max-w-3xl mx-auto">
                From idea to working API in minutes, not days
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className='bg-[#2b3166] border-0 rounded-xl p-10'>
                <CardContent className='flex items-center flex-col'>
                <div className="w-12 h-12 mb-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl font-bold ">1</div>

                  <p className='text-white font-medium text-[18px] font-outfit mb-3'>
                  Define your APIs
                  </p>
                  <p className="text-[#FFFFFF99] text-[15px] text-base/7 text-center">
                    Create workspaces, collections, and define mock APIs with custom endpoints, methods, and responses.
                  </p>
                </CardContent>
              </Card>
              
              <Card className='bg-[#2b3166] border-0 rounded-xl p-10'>
                <CardContent className='flex items-center flex-col'>
                <div className="w-12 h-12 mb-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl font-bold ">2</div>

                  <p className='text-white font-medium text-[18px] font-outfit mb-3'>
                  Get a unique URL
                  </p>
                  <p className="text-[#FFFFFF99] text-[15px] text-base/7 text-center">
                  Each API you create gets its own unique URL that you can use in your application right away.
                  </p>
                </CardContent>
              </Card>

              <Card className='bg-[#2b3166] border-0 rounded-xl p-10'>
                <CardContent className='flex items-center flex-col'>
                <div className="w-12 h-12 mb-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl font-bold ">3</div>

                  <p className='text-white font-medium text-[18px] font-outfit mb-3'>
                  Collaborate with your team
                  </p>
                  <p className="text-[#FFFFFF99] text-[15px] text-base/7 text-center">
                  Invite teammates to your workspaces and work together on API mocks with real-time updates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-outfit">Features that make your work easier</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-outfit">Authentication Simulation</h3>
                  <p className="text-muted-foreground">
                    Test your auth flows with OAuth, JWT, or API key simulation without setting up real auth servers.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-300">
                    <BarChart className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-outfit">Detailed Analytics</h3>
                  <p className="text-muted-foreground">
                    Monitor API usage with comprehensive logs showing who accessed your APIs, when, and what responses were returned.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-300">
                    <Clock className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-outfit">Rate Limits & Delay Simulation</h3>
                  <p className="text-muted-foreground">
                    Test how your app handles rate limits and slow responses with configurable delays and rate limiting.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-300">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-outfit">Team Collaboration</h3>
                  <p className="text-muted-foreground">
                    Work together with your team by sharing workspaces and collections with flexible permission controls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 font-outfit">Ready to speed up your development?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Join thousands of developers who are already using MockAPI to streamline their workflow.
            </p>
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg" asChild>
              <Link href={"/login"}>
                {"Get started now"}
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-6 bg-muted dark:bg-slate-800">
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
