"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Loader2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function InvitePage({ params }: { params: { token: string } }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'needs_signup'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [signupData, setSignupData] = useState<{ email: string; team_id: string; role: string } | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function acceptInvitation() {
      try {
        // Call the accept_invitation function
        const { data, error } = await supabase
          .rpc('accept_invitation', { invite_token: params.token })

        if (error) {
          throw error
        }

        if (!data) {
          throw new Error('No data returned from server')
        }

        if (data.status === 'error') {
          throw new Error(data.error || 'Failed to accept invitation')
        }

        if (data.status === 'needs_signup') {
          setSignupData({
            email: data.email,
            team_id: data.team_id,
            role: data.role
          })
          setStatus('needs_signup')
          return
        }

        if (data.status === 'success') {
          setStatus('success')
          // Redirect to the team page after a short delay
          setTimeout(() => {
            router.push(`/team/${data.team_id}`)
          }, 2000)
        } else {
          throw new Error('Failed to accept invitation')
        }
      } catch (error) {
        console.error('Error accepting invitation:', error)
        setError(error instanceof Error ? error.message : 'An unexpected error occurred')
        setStatus('error')
      }
    }

    acceptInvitation()
  }, [params.token, router, supabase])

  const handleSignup = () => {
    if (signupData) {
      // Store the invitation data in localStorage
      localStorage.setItem('invitation_data', JSON.stringify(signupData))
      // Redirect to signup page
      router.push('/signup')
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Accepting Invitation</CardTitle>
            <CardDescription>Please wait while we process your invitation...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error || 'An error occurred while accepting the invitation'}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push('/')}>Return Home</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (status === 'needs_signup') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign Up Required</CardTitle>
            <CardDescription>You need to create an account to accept this invitation.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleSignup}>Sign Up</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Invitation Accepted</CardTitle>
          <CardDescription>You have successfully joined the team!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Redirecting you to the team page...</p>
        </CardContent>
      </Card>
    </div>
  )
} 