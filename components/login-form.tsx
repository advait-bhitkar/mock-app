"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
            className="underline underline-offset-4"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>

      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
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
              </div>
              
              {error && (
                <div className="text-destructive text-sm">{error}</div>
              )}
              
              {success && (
                <div className="text-green-600 dark:text-green-500 text-sm">{success}</div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
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
              
              {success && (
                <div className="text-green-600 dark:text-green-500 text-sm">{success}</div>
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
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Button variant="outline" type="button" className="w-full" onClick={async () => {
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
          } catch (err) {
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
        
        <Button variant="outline" type="button" className="w-full" onClick={async () => {
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
          } catch (err) {
            setError('Failed to sign in with GitHub')
          } finally {
            setLoading(false)
          }
        }}>
          <Github className="w-5 h-5 mr-2" />
          GitHub
        </Button>
        
        <Button variant="outline" type="button" className="w-full" onClick={async () => {
          try {
            setLoading(true)
            setError(null)
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'apple',
              options: {
                redirectTo: `${window.location.origin}/auth/callback`
              }
            })
            if (error) setError(error.message)
          } catch (err) {
            setError('Failed to sign in with Apple')
          } finally {
            setLoading(false)
          }
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
            <path
              d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
              fill="currentColor"
            />
          </svg>
          Apple
        </Button>
      </div>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link>{" "}
        and <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  )
}
