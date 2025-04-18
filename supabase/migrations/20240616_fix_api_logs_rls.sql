-- Enable Row Level Security for api_logs table if not already enabled
ALTER TABLE api_logs ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Anyone can view api_logs" ON api_logs;
DROP POLICY IF EXISTS "Anyone can insert api_logs" ON api_logs;
DROP POLICY IF EXISTS "Anyone can select api_logs" ON api_logs;

-- Create open policies to allow logging from server functions
CREATE POLICY "Anyone can insert api_logs"
ON api_logs
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can select api_logs"
ON api_logs
FOR SELECT
USING (true);

-- Alternatively, completely disable RLS for this table
-- (Only do this for logging tables, not for sensitive data!)
-- This is a workaround for development only
-- Comment the above policies and uncomment this line if you're still having issues
-- ALTER TABLE api_logs DISABLE ROW LEVEL SECURITY; 