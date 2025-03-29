import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()
  
  // Special handling for auth callback routes
  const { pathname } = request.nextUrl
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const accessToken = requestUrl.searchParams.get('access_token')

  // Debug information
  console.log(`Middleware: Path=${pathname}, Has code=${!!code}, Type=${type || 'none'}, Has token=${!!accessToken}`)
  
  // Handle auth code exchange
  if (code) {
    try {
      // Exchange the code for a session
      console.log("Exchanging auth code for session")
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error("Code exchange error:", error)
      } else {
        console.log("Code exchange successful")
      }
      
      // For password reset flow, keep the user on the reset-password page
      if (pathname === '/reset-password' || type === 'recovery') {
        console.log("Detected reset password flow, continuing on reset page")
        return res
      }
      
      // For normal auth callback, redirect to dashboard
      if (pathname === '/auth/callback') {
        console.log("Auth callback complete, redirecting to dashboard")
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (err) {
      console.error("Error in auth callback:", err)
    }
  }

  // For reset-password route, always allow access even with hash fragments
  if (pathname === '/reset-password') {
    console.log("Reset password page access granted")
    return res
  }
  
  return res
}

// Run the middleware on all routes except static files and API routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
} 