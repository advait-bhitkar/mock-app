"use client"

import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
          
          <div className="max-w-4xl mx-auto prose dark:prose-invert">
            <p className="text-lg text-muted-foreground text-center mb-12">
              Last updated: June 1, 2023
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to MockAPI. These Terms of Service govern your use of our website and services. 
                By accessing or using MockAPI, you agree to be bound by these Terms. If you disagree with any part of the terms, 
                you may not access the service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. 
                You agree not to disclose your password to any third party.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Content</h2>
              <p>
                Our service allows you to create, configure, and manage mock APIs. You are responsible for the data you provide and the APIs you create. 
                You retain any and all of your rights to any content you submit, and you are responsible for protecting those rights.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <p>
                You may not use MockAPI for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction.
              </p>
              <p>
                You agree not to use the service to:
              </p>
              <ul className="list-disc pl-6 my-4">
                <li>Create or upload malicious content</li>
                <li>Infringe upon the intellectual property rights of others</li>
                <li>Transmit unsolicited commercial communications (spam)</li>
                <li>Attempt to interfere with or disrupt the service or servers</li>
                <li>Impersonate another user or person</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Subscription and Payment</h2>
              <p>
                Some aspects of our service are offered on a subscription basis. You will be billed in advance on a recurring basis, depending on the subscription plan you select.
              </p>
              <p>
                We reserve the right to change our prices at any time. If we do change prices, we will provide notice of the change on the website or by email.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Disclaimer</h2>
              <p>
                Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p>
                In no event shall MockAPI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:legal@mockapi.com" className="text-primary hover:underline">legal@mockapi.com</a>.
              </p>
            </section>
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