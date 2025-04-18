-- Create api_logs table to track detailed API request data
CREATE TABLE IF NOT EXISTS api_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mock_api_id UUID NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  request_ip TEXT,
  request_headers JSONB,
  request_body JSONB,
  response_status INTEGER,
  response_time_ms INTEGER,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries on mock_api_id
CREATE INDEX IF NOT EXISTS api_logs_mock_api_id_idx ON api_logs(mock_api_id);

-- Create index for timestamp-based queries
CREATE INDEX IF NOT EXISTS api_logs_timestamp_idx ON api_logs(timestamp);

-- Add a function to cleanup old logs
CREATE OR REPLACE FUNCTION cleanup_old_api_logs() 
RETURNS void AS $$
BEGIN
  -- Delete logs older than 30 days
  DELETE FROM api_logs
  WHERE timestamp < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql; 