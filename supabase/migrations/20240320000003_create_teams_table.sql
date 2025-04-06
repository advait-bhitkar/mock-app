-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to view teams they are members of
CREATE POLICY "Users can view their teams"
ON teams
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM members m
    WHERE m.team_id = teams.id
    AND m.user_id = auth.uid()
  )
);

-- Allow users to create teams
CREATE POLICY "Users can create teams"
ON teams
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow team admins to update their teams
CREATE POLICY "Team admins can update their teams"
ON teams
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM members m
    WHERE m.team_id = teams.id
    AND m.user_id = auth.uid()
    AND m.role = 'admin'
  )
);

-- Allow team admins to delete their teams
CREATE POLICY "Team admins can delete their teams"
ON teams
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM members m
    WHERE m.team_id = teams.id
    AND m.user_id = auth.uid()
    AND m.role = 'admin'
  )
); 