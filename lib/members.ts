import supabase from "@/lib/supabase"
import { Member, MemberRole } from "@/lib/types/member"

export async function getTeamMembers(teamId: string): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching team members:", error)
    throw error
  }

  return data || []
}

export async function addTeamMember(teamId: string, email: string, role: MemberRole = 'viewer'): Promise<{ success: boolean; message: string }> {
  try {
    // First check if the user is already a member of the team
    const { data: existingMember, error: memberError } = await supabase
      .from("members")
      .select("*")
      .eq("team_id", teamId)
      .eq("email", email)
      .single()

    if (memberError && memberError.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw new Error("Failed to check existing member")
    }

    if (existingMember) {
      throw new Error("User is already a member of this team")
    }

    // Generate a unique invitation token
    const token = crypto.randomUUID()
    
    // Create the invitation
    const { error: inviteError } = await supabase
      .from("invitations")
      .insert({
        team_id: teamId,
        email: email,
        role: role,
        token: token,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        created_at: new Date().toISOString()
      })

    if (inviteError) {
      throw new Error("Failed to create invitation")
    }

    // Send invitation email
    await sendInvitationEmail(email, token)

    return {
      success: true,
      message: "Invitation sent successfully"
    }
  } catch (error) {
    console.error("Error in addTeamMember:", error)
    throw error instanceof Error ? error : new Error("An unexpected error occurred")
  }
}

// Function to add team creator as admin member
export async function addTeamCreatorAsMember(teamId: string, userId: string): Promise<void> {
  try {
    // First check if the user is already a member
    const { data: existingMember, error: checkError } = await supabase
      .from("members")
      .select("*")
      .eq("team_id", teamId)
      .eq("user_id", userId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error("Error checking existing member:", checkError)
      throw new Error(checkError.message || "Failed to check existing member")
    }

    if (existingMember) {
      // User is already a member, no need to add again
      return
    }

    // Get user's email using the function
    const { data: email, error: emailError } = await supabase
      .rpc('get_user_email', { user_id: userId })

    if (emailError) {
      console.error("Error fetching user email:", emailError)
      throw new Error(emailError.message || "Failed to fetch user email")
    }

    if (!email) {
      throw new Error("User email not found")
    }

    const { error } = await supabase
      .from("members")
      .insert({
        team_id: teamId,
        user_id: userId,
        email: email,
        name: email.split('@')[0], // Default name from email
        role: "admin",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error("Error adding team creator as member:", error)
      throw new Error(error.message || "Failed to add team creator as member")
    }
  } catch (error) {
    console.error("Error in addTeamCreatorAsMember:", error)
    throw error instanceof Error ? error : new Error("An unexpected error occurred")
  }
}

async function sendInvitationEmail(email: string, token: string) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Email sending error:", data.error)
      throw new Error(data.error || "Failed to send invitation email")
    }

    return data
  } catch (error) {
    console.error("Error in sendInvitationEmail:", error)
    throw error instanceof Error ? error : new Error("An unexpected error occurred")
  }
}

export async function updateMemberRole(
  memberId: string,
  role: MemberRole
): Promise<Member> {
  const { data, error } = await supabase
    .from("members")
    .update({ role })
    .eq("id", memberId)
    .select()
    .single()

  if (error) {
    console.error("Error updating member role:", error)
    throw error
  }

  return data
}

export async function removeTeamMember(memberId: string): Promise<void> {
  const { error } = await supabase
    .from("members")
    .delete()
    .eq("id", memberId)

  if (error) {
    console.error("Error removing team member:", error)
    throw error
  }
}

export async function searchMembers(
  teamId: string,
  query: string
): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("team_id", teamId)
    .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching members:", error)
    throw error
  }

  return data || []
} 