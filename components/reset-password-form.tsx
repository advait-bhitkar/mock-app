"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import supabase from "@/lib/supabase"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isResetMode, setIsResetMode] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for hash fragment or query parameters that indicate a reset token
    const hasResetToken = searchParams?.has("token") || 
                         searchParams?.has("code") ||
                         searchParams?.has("type") ||
                         window.location.hash.includes("type=recovery");
    
    if (hasResetToken) {
      console.log("Reset token detected in URL");
      setIsResetMode(true);
      
      // Extract the token from the hash if present (for email links with # fragment)
      if (window.location.hash && !searchParams?.has("token")) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const type = hashParams.get("type");
        
        console.log("Hash parameters:", { type, hasAccessToken: !!accessToken });
        
        // If we have tokens in the hash, set them in storage
        if (accessToken && type === "recovery") {
          // Setup the session from the hash tokens
          const setupSession = async () => {
            try {
              const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken || "",
              });
              
              if (error) {
                console.error("Session setup error:", error);
                setError("Unable to process reset token. Please request a new one.");
              } else {
                console.log("Session established from hash");
              }
            } catch (err) {
              console.error("Error setting up session:", err);
              setError("An error occurred processing your reset link.");
            }
          };
          
          setupSession();
        }
      } else {
        // Check if we have a valid session
        const checkSession = async () => {
          const { data, error } = await supabase.auth.getSession();
          console.log("Current session:", data.session ? "exists" : "none");
          
          if (error) {
            console.error("Session error:", error);
            setError("Reset link is invalid or has expired. Please request a new one.");
          }
        };
        
        checkSession();
      }
    }
  }, [searchParams]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Request password reset with Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) {
        console.error("Reset request error:", error)
        setError(error.message)
        return
      }
      
      // Show success message
      setSuccess("Check your email for a password reset link")
    } catch (err) {
      console.error("Unexpected error during reset request:", err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Get the current session to ensure we have authentication
      const { data: sessionData } = await supabase.auth.getSession()
      console.log("Session before password update:", sessionData.session ? "exists" : "none")
      
      if (!sessionData.session) {
        setError("Your reset session has expired. Please request a new reset link.")
        return
      }
      
      // Update the user's password
      console.log("Updating password...")
      const { data, error } = await supabase.auth.updateUser({
        password: password
      })
      
      if (error) {
        console.error("Password update error:", error)
        setError(error.message)
        return
      }
      
      console.log("Password updated successfully")
      
      // Sign out the user after password reset
      await supabase.auth.signOut()
      
      // Show success message and redirect to login
      setSuccess("Password has been reset successfully. Please login with your new password.")
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login?reset=successful')
      }, 2000)
    } catch (err) {
      console.error("Unexpected error during password update:", err)
      setError('An unexpected error occurred')
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
        <h1 className="text-xl font-bold">
          {isResetMode ? "Reset Your Password" : "Forgot Your Password?"}
        </h1>
        <div className="text-center text-sm">
          {isResetMode 
            ? "Enter your new password below" 
            : "Enter your email and we'll send you a password reset link"}
        </div>
      </div>

      {isResetMode ? (
        <form onSubmit={handleResetPassword} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="text-destructive text-sm">{error}</div>
            )}
            
            {success && (
              <div className="text-green-600 dark:text-green-500 text-sm">{success}</div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Reset Password"}
            </Button>
            
            {error && (
              <div className="text-center">
                <Link href="/reset-password" className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">
                  Request a new reset link
                </Link>
              </div>
            )}
          </div>
        </form>
      ) : (
        <form onSubmit={handleRequestReset} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
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
              {loading ? "Processing..." : "Send Reset Link"}
            </Button>
            
            <div className="text-center">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">
                Back to login
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  )
} 