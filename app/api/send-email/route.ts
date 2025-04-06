import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Send the invitation email using Resend
    const { data, error } = await resend.emails.send({
      from: 'MockIt <invites@bhitkar.dev>',
      to: email,
      subject: "You've been invited to join a team on MockIt",
      html: `
        <h1>Team Invitation</h1>
        <p>You've been invited to join a team on MockIt.</p>
        <p>Click the link below to accept the invitation:</p>
        <a href="${invitationLink}">Accept Invitation</a>
        <p>This invitation will expire in 7 days.</p>
      `,
      text: `
        Team Invitation
        
        You've been invited to join a team on MockIt.
        
        Click the link below to accept the invitation:
        ${invitationLink}
        
        This invitation will expire in 7 days.
      `
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json(
        { error: error.message || "Failed to send invitation email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Invitation sent successfully"
    })
  } catch (error) {
    console.error("Error in send-email API route:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
} 