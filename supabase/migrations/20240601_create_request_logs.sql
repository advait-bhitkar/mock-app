-- Create request_logs table to track API usage
CREATE TABLE IF NOT EXISTS request_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  endpoint_id UUID NOT NULL REFERENCES endpoints(id) ON DELETE CASCADE,
  method TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries on endpoint_id
CREATE INDEX IF NOT EXISTS request_logs_endpoint_id_idx ON request_logs(endpoint_id);

-- Create index for timestamp-based queries
CREATE INDEX IF NOT EXISTS request_logs_timestamp_idx ON request_logs(timestamp);

-- Add a function to cleanup old logs (optional)
CREATE OR REPLACE FUNCTION cleanup_old_logs() 
RETURNS void AS $$
BEGIN
  -- Delete logs older than 30 days
  DELETE FROM request_logs
  WHERE timestamp < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql; 