import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, token } = await request.json()
    
    if (!email || !token) {
      return NextResponse.json(
        { error: "Email and token are required" },
        { status: 400 }
      )
    }
    
    // Get the site URL from environment variables
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    // Create the invitation link
    const invitationLink = `${siteUrl}/invite/${token}`

    // Send the invitation email using the REST API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!
      },
      body: JSON.stringify({
        email,
        data: {
          invitation_link: invitationLink
        }
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Error sending email:", data)
      return NextResponse.json(
        { error: data.error?.message || "Failed to send invitation email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Invitation sent successfully"
    })
  } catch (error) {
    console.error("Error in invite API route:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
} 