import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CenterNav } from '@/components/center-nav';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              At MockAPI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Register for an account</li>
              <li>Subscribe to our service</li>
              <li>Request customer support</li>
              <li>Communicate with us by email or other means</li>
            </ul>
            <p>
              This information may include your name, email address, billing information, and any other information you choose to provide.
            </p>
            <p>
              We also automatically collect certain information when you use our Service, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Log data (IP address, browser type, pages visited, time spent, etc.)</li>
              <li>Device information (hardware model, operating system, unique device identifiers)</li>
              <li>Usage data (features you use, actions you take)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and administrative messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Personalize your experience and provide content or features that match your profile and interests</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Sharing and Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with whom we jointly offer products or services</li>
              <li>Legal authorities if required by law or to protect our rights</li>
              <li>Affiliated companies or third parties in connection with a merger, sale, or acquisition</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Choices and Rights</h2>
            <p>
              You have several rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Access and update your information through your account settings</li>
              <li>Opt-out of marketing communications</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Data portability</li>
            </ul>
            <p>
              To exercise these rights, please contact us at <a href="mailto:privacy@mockapi.com" className="text-primary hover:underline">privacy@mockapi.com</a>.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Cookies Policy</h2>
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activities and to improve your experience on our Service. You can set your browser to refuse all or some browser cookies, but this may prevent you from using parts of our Service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@mockapi.com" className="text-primary hover:underline">privacy@mockapi.com</a>.
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