-- Ensure cover_image column exists in campaigns table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'campaigns' AND column_name = 'cover_image') THEN
        ALTER TABLE campaigns ADD COLUMN cover_image TEXT;
    END IF;
END $$;

-- Make sure the column is nullable
ALTER TABLE campaigns ALTER COLUMN cover_image DROP NOT NULL;

-- Update any existing records with NULL cover_image to have a default
UPDATE campaigns 
SET cover_image = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80' 
WHERE cover_image IS NULL;
