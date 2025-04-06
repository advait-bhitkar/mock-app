-- Create a view to access user information from auth.users
CREATE OR REPLACE VIEW public.users AS
SELECT 
  id,
  email,
  raw_user_meta_data->>'name' as name,
  raw_user_meta_data->>'avatar_url' as avatar_url,
  created_at,
  updated_at
FROM auth.users;

-- Grant access to authenticated users
GRANT SELECT ON public.users TO authenticated;

-- Create a function to get user email
CREATE OR REPLACE FUNCTION public.get_user_email(user_id uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT email FROM auth.users WHERE id = user_id;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_email TO authenticated; 