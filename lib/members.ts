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

export async function addTeamMember(
  teamId: string,
  email: string,
  role: MemberRole
): Promise<{ status: 'added' | 'invited', member?: Member, inviteToken?: string }> {
  try {
    // First check if the user is already a member of the team
    const { data: existingMember, error: memberError } = await supabase
      .from("members")
      .select("*")
      .eq("team_id", teamId)
      .eq("email", email)
      .single()

    if (memberError && memberError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error("Error checking existing member:", memberError)
      throw new Error(memberError.message || "Failed to check existing member")
    }

    if (existingMember) {
      throw new Error("User is already a member of this team")
    }

    // Call the invitation function
    const { data, error } = await supabase
      .rpc('handle_user_invitation', {
        p_email: email,
        p_name: email.split('@')[0], // Default name from email
        p_avatar_url: null,
        p_team_id: teamId,
        p_role: role
      })

    if (error) {
      console.error("Error handling user invitation:", error)
      throw new Error(error.message || "Failed to handle user invitation")
    }

    if (!data) {
      throw new Error("No data returned from invitation function")
    }

    if (data.status === 'invited') {
      // Send invitation email
      await sendInvitationEmail(email, data.token)
      return { status: 'invited', inviteToken: data.token }
    } else {
      // User already exists, get the member details
      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("*")
        .eq("team_id", teamId)
        .eq("user_id", data.user_id)
        .single()

      if (memberError) {
        console.error("Error fetching new member:", memberError)
        throw new Error(memberError.message || "Failed to fetch new member")
      }

      return { status: 'added', member: memberData }
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
  // TODO: Implement email sending
  // This is a placeholder for the actual email sending implementation
  console.log(`Sending invitation email to ${email} with token ${token}`)
  
  // In a real implementation, you would:
  // 1. Generate an invitation link with the token
  // 2. Send an email with the link using your email service
  // 3. Handle the invitation acceptance in your API
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