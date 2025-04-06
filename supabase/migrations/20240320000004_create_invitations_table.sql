-- Create invitations table
CREATE TABLE IF NOT EXISTS invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT valid_role CHECK (role IN ('admin', 'developer', 'viewer'))
);

-- Enable RLS
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow team admins to view and manage their team's invitations
CREATE POLICY "Team admins can manage invitations"
ON invitations
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM members m
    WHERE m.team_id = invitations.team_id
    AND m.user_id = auth.uid()
    AND m.role = 'admin'
  )
);

-- Allow anyone to view an invitation by token (for accepting)
CREATE POLICY "Anyone can view invitation by token"
ON invitations
FOR SELECT
USING (true);

-- Create index for faster token lookups
CREATE INDEX idx_invitations_token ON invitations(token);

-- Create index for faster email lookups
CREATE INDEX idx_invitations_email ON invitations(email); 