import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()
  
  // Special handling for auth callback route
  const { pathname } = request.nextUrl
  if (pathname === '/auth/callback') {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      // Exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code)
      // Redirect to dashboard after successful auth
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return res
}

// Run the middleware on all routes except static files and API routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
} 