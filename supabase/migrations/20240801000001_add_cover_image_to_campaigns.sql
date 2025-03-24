-- Add cover_image column to campaigns table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'campaigns' AND column_name = 'cover_image') THEN
        ALTER TABLE campaigns ADD COLUMN cover_image TEXT;
    END IF;
END $$;

-- Enable realtime for campaigns table
ALTER PUBLICATION supabase_realtime ADD TABLE campaigns;
