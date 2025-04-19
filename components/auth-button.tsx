"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabase';

export function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await supabase.auth.getSession();
        setIsLoggedIn(!!data.session);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    }
    
    checkAuth();
  }, []);

  if (loading) {
    return <div className="w-[160px]"></div>; // Use empty div with width to prevent layout shift
  }

  if (isLoggedIn) {
    return (
      <Button asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    );
  }

  return (
    <>
      <Button variant="outline" className="mr-2" asChild>
        <Link href="/login">Sign in</Link>
      </Button>
      <Button asChild>
        <Link href="/dashboard">Get Started</Link>
      </Button>
    </>
  );
} 