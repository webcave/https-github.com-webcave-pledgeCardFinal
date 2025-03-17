-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  target_amount DECIMAL NOT NULL,
  current_amount DECIMAL NOT NULL DEFAULT 0,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  story TEXT NOT NULL,
  short_description TEXT NOT NULL,
  organizer_name TEXT NOT NULL,
  organizer_bio TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create campaign_media table for storing media files
CREATE TABLE IF NOT EXISTS campaign_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable realtime for campaigns
alter publication supabase_realtime add table campaigns;
alter publication supabase_realtime add table campaign_media;

-- Create RLS policies for campaigns
DROP POLICY IF EXISTS "Users can view public campaigns" ON campaigns;
CREATE POLICY "Users can view public campaigns"
  ON campaigns FOR SELECT
  USING (is_public = true);

DROP POLICY IF EXISTS "Users can view their own campaigns" ON campaigns;
CREATE POLICY "Users can view their own campaigns"
  ON campaigns FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own campaigns" ON campaigns;
CREATE POLICY "Users can insert their own campaigns"
  ON campaigns FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own campaigns" ON campaigns;
CREATE POLICY "Users can update their own campaigns"
  ON campaigns FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own campaigns" ON campaigns;
CREATE POLICY "Users can delete their own campaigns"
  ON campaigns FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for campaign_media
DROP POLICY IF EXISTS "Users can view public campaign media" ON campaign_media;
CREATE POLICY "Users can view public campaign media"
  ON campaign_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.is_public = true
    )
  );

DROP POLICY IF EXISTS "Users can view their own campaign media" ON campaign_media;
CREATE POLICY "Users can view their own campaign media"
  ON campaign_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert their own campaign media" ON campaign_media;
CREATE POLICY "Users can insert their own campaign media"
  ON campaign_media FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update their own campaign media" ON campaign_media;
CREATE POLICY "Users can update their own campaign media"
  ON campaign_media FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete their own campaign media" ON campaign_media;
CREATE POLICY "Users can delete their own campaign media"
  ON campaign_media FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.user_id = auth.uid()
    )
  );