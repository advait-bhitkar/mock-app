-- Create function to get teams for a user
CREATE OR REPLACE FUNCTION public.get_user_teams()
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT DISTINCT t.*
  FROM teams t
  LEFT JOIN members m ON m.team_id = t.id
  WHERE t.user_id = auth.uid() OR m.user_id = auth.uid()
  ORDER BY t.created_at DESC;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_teams TO authenticated; 