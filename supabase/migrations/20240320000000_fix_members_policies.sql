-- Drop existing policies
DROP POLICY IF EXISTS "Team members can view their team's members" ON members;
DROP POLICY IF EXISTS "Team admins can manage their team's members" ON members;
DROP POLICY IF EXISTS "Team creators can add themselves as members" ON members;

-- Enable RLS
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Create new policies
-- Policy for viewing members
CREATE POLICY "Team members can view their team's members"
ON members
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM members m
    WHERE m.team_id = members.team_id
    AND m.user_id = auth.uid()
  )
);

-- Policy for managing members (update, delete)
CREATE POLICY "Team admins can manage their team's members"
ON members
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM members m
    WHERE m.team_id = members.team_id
    AND m.user_id = auth.uid()
    AND m.role = 'admin'
  )
);

-- Special policy for team creators to add themselves
CREATE POLICY "Team creators can add themselves as members"
ON members
FOR INSERT
WITH CHECK (
  -- Allow if user is the team creator
  EXISTS (
    SELECT 1 FROM teams t
    WHERE t.id = members.team_id
    AND t.user_id = auth.uid()
  )
  AND members.user_id = auth.uid()
  AND members.role = 'admin'
  -- OR if user is already a team admin
  OR EXISTS (
    SELECT 1 FROM members m
    WHERE m.team_id = members.team_id
    AND m.user_id = auth.uid()
    AND m.role = 'admin'
  )
); 