"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { GalleryVerticalEnd, Github } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import supabase from "@/lib/supabase"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for already authenticated user
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [router])

  useEffect(() => {
    // Check if user is coming from password reset
    if (searchParams?.get('reset') === 'successful') {
      setSuccess('Your password has been reset successfully. Please log in with your new password.')
    }
  }, [searchParams])

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (isSignUp) {
        // Sign up with Supabase
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (error) {
          setError(error.message)
          return
        }
        
        // Show success message for signup
        setSuccess("Check your email to confirm your account")
      } else {
        // Sign in with Supabase
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) {
          setError(error.message)
          return
        }
        
        // Redirect to dashboard on successful login
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLinkAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Send magic link email
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      // Show success message for magic link
      setSuccess("Check your email for the magic link")
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 font-medium"
        >
          <div className="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-6" />
          </div>
          <span className="sr-only">MockAPI</span>
        </Link>
        <h1 className="text-xl font-bold">Welcome to MockAPI</h1>
        <div className="text-center text-sm">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError(null)
              setSuccess(null)
            }}
            className="underline underline-offset-4 hover:cursor-pointer"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>

      {success && (
        <div className="text-green-600 dark:text-green-500 text-sm px-4 py-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-md text-center">
          {success}
        </div>
      )}

      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="password" className="hover:cursor-pointer">Password</TabsTrigger>
          <TabsTrigger value="magic-link" className="hover:cursor-pointer">Magic Link</TabsTrigger>
        </TabsList>
        
        <TabsContent value="password">
          <form onSubmit={handlePasswordAuth} className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email-password">Email</Label>
                <Input
                  id="email-password"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isSignUp && (
                  <div className="text-right">
                    <Link href="/reset-password" className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">
                      Forgot password?
                    </Link>
                  </div>
                )}
              </div>
              
              {error && (
                <div className="text-destructive text-sm">{error}</div>
              )}
              
              <Button type="submit" className="w-full hover:cursor-pointer" disabled={loading}>
                {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="magic-link">
          <form onSubmit={handleMagicLinkAuth} className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email-magic">Email</Label>
                <Input
                  id="email-magic"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              {error && (
                <div className="text-destructive text-sm">{error}</div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Send Magic Link"}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Button variant="outline" type="button" className="w-full hover:cursor-pointer" onClick={async () => {
          try {
            setLoading(true)
            setError(null)
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${window.location.origin}/auth/callback`
              }
            })
            if (error) setError(error.message)
          } catch (_) {
            setError('Failed to sign in with Google')
          } finally {
            setLoading(false)
          }
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Google
        </Button>
        
        <Button variant="outline" type="button" className="w-full hover:cursor-pointer" onClick={async () => {
          try {
            setLoading(true)
            setError(null)
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'github',
              options: {
                redirectTo: `${window.location.origin}/auth/callback`
              }
            })
            if (error) setError(error.message)
          } catch (_) {
            setError('Failed to sign in with GitHub')
          } finally {
            setLoading(false)
          }
        }}>
          <Github className="w-5 h-5 mr-2" />
          GitHub
        </Button>
      </div>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link>{" "}
        and <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  )
}
