import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CenterNav } from '@/components/center-nav';

export default function TermsPage() {
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
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to MockAPI. These Terms of Service ("Terms") govern your access to and use of the MockAPI platform, including any services, websites, and applications offered by MockAPI (collectively, the "Service").
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Account Registration</h2>
            <p>
              To use certain features of the Service, you may be required to register for an account. When you register, you must provide accurate and complete information and keep this information updated.
            </p>
            <p>
              You are responsible for safeguarding your account credentials and for any activities or actions under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. User Content</h2>
            <p>
              Our Service allows you to create, upload, store, and share API mocks and related content ("User Content"). You retain all rights to your User Content, but you grant us a license to use, copy, modify, and distribute it in connection with the Service.
            </p>
            <p>
              You are solely responsible for your User Content and the consequences of sharing it. You represent and warrant that you have all necessary rights to your User Content and that it does not violate any laws or infringe on any third-party rights.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Acceptable Use</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Violate any laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Send spam or unsolicited communications</li>
              <li>Distribute malware or engage in harmful activities</li>
              <li>Attempt to gain unauthorized access to the Service or its systems</li>
              <li>Interfere with the operation of the Service</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Subscription and Payment</h2>
            <p>
              Some features of the Service require a paid subscription. Subscription fees are charged in advance and are non-refundable. You agree to provide accurate billing information and authorize us to charge your payment method.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service at our discretion, without prior notice, for any reason, including if you breach these Terms.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Disclaimers</h2>
            <p>
              The Service is provided "as is" without warranties of any kind, whether express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. If we make material changes, we will notify you via the Service or by other means. Your continued use of the Service after the changes take effect constitutes your acceptance of the revised Terms.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:support@mockapi.com" className="text-primary hover:underline">support@mockapi.com</a>.
            </p>
          </div>
        </div>
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