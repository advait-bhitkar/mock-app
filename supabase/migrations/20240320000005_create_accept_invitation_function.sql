-- Create function to accept invitation
CREATE OR REPLACE FUNCTION public.accept_invitation(invite_token text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  invitation invitations;
  user_id uuid;
  member_id uuid;
BEGIN
  -- Get the invitation
  SELECT * INTO invitation
  FROM invitations
  WHERE token = invite_token
  AND expires_at > now()
  AND NOT EXISTS (
    SELECT 1 FROM members m
    WHERE m.team_id = invitations.team_id
    AND m.email = invitations.email
  );

  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Invalid or expired invitation'
    );
  END IF;

  -- Get or create user
  SELECT id INTO user_id
  FROM auth.users
  WHERE email = invitation.email;

  IF NOT FOUND THEN
    -- Create new user
    INSERT INTO auth.users (email)
    VALUES (invitation.email)
    RETURNING id INTO user_id;
  END IF;

  -- Add user to team
  INSERT INTO members (
    team_id,
    user_id,
    email,
    name,
    role,
    created_at,
    updated_at
  )
  VALUES (
    invitation.team_id,
    user_id,
    invitation.email,
    split_part(invitation.email, '@', 1),
    invitation.role,
    now(),
    now()
  )
  RETURNING id INTO member_id;

  -- Delete the invitation
  DELETE FROM invitations WHERE id = invitation.id;

  RETURN json_build_object(
    'success', true,
    'member_id', member_id,
    'team_id', invitation.team_id
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.accept_invitation TO authenticated; 