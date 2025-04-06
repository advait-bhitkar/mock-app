-- Disable RLS on members table
ALTER TABLE members DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Team members can view their team's members" ON members;
DROP POLICY IF EXISTS "Team admins can manage their team's members" ON members;
DROP POLICY IF EXISTS "Team creators can add themselves as members" ON members; 