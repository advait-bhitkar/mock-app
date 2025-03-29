"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabase'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        
        if (!data.session) {
          router.push('/login')
          return
        }
        
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Authentication error:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false)
          router.push('/login')
        } else if (session) {
          setIsAuthenticated(true)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-primary border-opacity-50"></div>
      </div>
    )
  }

  // Show children only if authenticated
  return isAuthenticated ? <>{children}</> : null
} 