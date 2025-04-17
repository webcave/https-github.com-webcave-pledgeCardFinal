-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  story TEXT NOT NULL,
  category TEXT NOT NULL,
  target_amount DECIMAL NOT NULL,
  current_amount DECIMAL NOT NULL DEFAULT 0,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  organizer_name TEXT NOT NULL,
  organizer_bio TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'active',
  backer_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create campaign_media table
CREATE TABLE IF NOT EXISTS campaign_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  is_cover BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  amount DECIMAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pledges table
CREATE TABLE IF NOT EXISTS pledges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  amount DECIMAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  message TEXT,
  pledge_date TIMESTAMP WITH TIME ZONE NOT NULL,
  reminder_frequency TEXT DEFAULT 'once',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE pledges ENABLE ROW LEVEL SECURITY;

-- Create policies for campaigns
DROP POLICY IF EXISTS "Public campaigns are viewable by everyone" ON campaigns;
CREATE POLICY "Public campaigns are viewable by everyone"
  ON campaigns FOR SELECT
  USING (is_public = true AND status = 'active');

DROP POLICY IF EXISTS "Users can view their own campaigns" ON campaigns;
CREATE POLICY "Users can view their own campaigns"
  ON campaigns FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own campaigns" ON campaigns;
CREATE POLICY "Users can create their own campaigns"
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

-- Create policies for campaign_media
DROP POLICY IF EXISTS "Campaign media is viewable by everyone" ON campaign_media;
CREATE POLICY "Campaign media is viewable by everyone"
  ON campaign_media FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert campaign media for their campaigns" ON campaign_media;
CREATE POLICY "Users can insert campaign media for their campaigns"
  ON campaign_media FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM campaigns
    WHERE campaigns.id = campaign_id
    AND campaigns.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can update campaign media for their campaigns" ON campaign_media;
CREATE POLICY "Users can update campaign media for their campaigns"
  ON campaign_media FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM campaigns
    WHERE campaigns.id = campaign_id
    AND campaigns.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can delete campaign media for their campaigns" ON campaign_media;
CREATE POLICY "Users can delete campaign media for their campaigns"
  ON campaign_media FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM campaigns
    WHERE campaigns.id = campaign_id
    AND campaigns.user_id = auth.uid()
  ));

-- Create policies for donations
DROP POLICY IF EXISTS "Donations are viewable by campaign owners" ON donations;
CREATE POLICY "Donations are viewable by campaign owners"
  ON donations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM campaigns
    WHERE campaigns.id = campaign_id
    AND campaigns.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can view their own donations" ON donations;
CREATE POLICY "Users can view their own donations"
  ON donations FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create donations" ON donations;
CREATE POLICY "Users can create donations"
  ON donations FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create policies for pledges
DROP POLICY IF EXISTS "Pledges are viewable by campaign owners" ON pledges;
CREATE POLICY "Pledges are viewable by campaign owners"
  ON pledges FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM campaigns
    WHERE campaigns.id = campaign_id
    AND campaigns.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can view their own pledges" ON pledges;
CREATE POLICY "Users can view their own pledges"
  ON pledges FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create pledges" ON pledges;
CREATE POLICY "Users can create pledges"
  ON pledges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own pledges" ON pledges;
CREATE POLICY "Users can update their own pledges"
  ON pledges FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own pledges" ON pledges;
CREATE POLICY "Users can delete their own pledges"
  ON pledges FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime for all tables
alter publication supabase_realtime add table campaigns;
alter publication supabase_realtime add table campaign_media;
alter publication supabase_realtime add table donations;
alter publication supabase_realtime add table pledges;
