"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          <p className="text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Have questions about MockAPI? We're here to help. Get in touch with our team and we'll get back to you as soon as possible.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <Mail className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">For general inquiries and support</p>
                <a href="mailto:support@mockapi.com" className="text-primary hover:underline">support@mockapi.com</a>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <Phone className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Monday to Friday, 9am - 5pm EST</p>
                <a href="tel:+11234567890" className="text-primary hover:underline">+1 (123) 456-7890</a>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <MapPin className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Our headquarters</p>
                <address className="not-italic">
                  123 Tech Street<br />
                  San Francisco, CA 94107<br />
                  United States
                </address>
              </CardContent>
            </Card>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea 
                      id="message" 
                      rows={6} 
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="py-8 px-6 bg-muted dark:bg-slate-800 mt-16">
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