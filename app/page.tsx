import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChart, Clock, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">MockAPI</h1>
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
      
      <main className="flex-1">
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-6">Create and manage mock APIs with ease</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Build, test, and share API mocks for rapid development and seamless collaboration.
              No more waiting for backend implementation.
            </p>
            <Button size="lg" className="px-8 py-6 text-lg" asChild>
              <Link href="/login">Start for free</Link>
            </Button>
          </div>
        </section>
        
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How it works</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From idea to working API in minutes, not days
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">1</div>
                  <CardTitle>Define your APIs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create workspaces, collections, and define mock APIs with custom endpoints, methods, and responses.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">2</div>
                  <CardTitle>Get a unique URL</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Each API you create gets its own unique URL that you can use in your application right away.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">3</div>
                  <CardTitle>Collaborate with your team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Invite teammates to your workspaces and work together on API mocks with real-time updates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Features that make your work easier</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Authentication Simulation</h3>
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
                  <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
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
                  <h3 className="text-xl font-bold mb-2">Rate Limits & Delay Simulation</h3>
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
                  <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
                  <p className="text-muted-foreground">
                    Work together with your team by sharing workspaces and collections with flexible permission controls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to speed up your development?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Join thousands of developers who are already using MockAPI to streamline their workflow.
            </p>
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg" asChild>
              <Link href="/login">Get started now</Link>
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
    </div>
  );
}
