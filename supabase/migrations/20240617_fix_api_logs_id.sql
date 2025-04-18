-- Check if the api_logs table exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'api_logs') THEN
        -- Modify the id column to use uuid_generate_v4() as default if it doesn't already
        -- First, make sure the uuid-ossp extension is installed
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
        -- Check if the id column has a default value
        IF NOT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'api_logs' 
            AND column_name = 'id' 
            AND column_default IS NOT NULL
        ) THEN
            -- Add the default value if it doesn't have one
            ALTER TABLE api_logs 
            ALTER COLUMN id SET DEFAULT uuid_generate_v4();
            
            -- Log a message
            RAISE NOTICE 'Added DEFAULT uuid_generate_v4() to api_logs.id column';
        ELSE
            RAISE NOTICE 'api_logs.id column already has a default value';
        END IF;
    ELSE
        RAISE NOTICE 'api_logs table does not exist';
    END IF;
END
$$; 