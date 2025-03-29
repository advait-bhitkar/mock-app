"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Check session and redirect
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      
      // If we have a session, redirect to dashboard
      if (data?.session && !error) {
        router.push('/dashboard')
      } else {
        // Otherwise redirect to login
        router.push('/login')
      }
    }
    
    checkSession()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-primary border-opacity-50"></div>
        <p className="text-muted-foreground">Authenticating...</p>
      </div>
    </div>
  )
} 