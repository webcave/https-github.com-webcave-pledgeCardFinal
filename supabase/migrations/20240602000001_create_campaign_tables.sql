-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  story TEXT NOT NULL,
  category TEXT NOT NULL,
  target_amount DECIMAL(12, 2) NOT NULL,
  current_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  organizer_name TEXT NOT NULL,
  organizer_bio TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'active',
  backer_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create campaign_media table
CREATE TABLE IF NOT EXISTS campaign_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  caption TEXT,
  is_cover BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_media ENABLE ROW LEVEL SECURITY;

-- Create policies for campaigns
DROP POLICY IF EXISTS "Public campaigns are viewable by everyone" ON campaigns;
CREATE POLICY "Public campaigns are viewable by everyone"
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
    WHERE campaigns.id = campaign_media.campaign_id
    AND campaigns.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can update campaign media for their campaigns" ON campaign_media;
CREATE POLICY "Users can update campaign media for their campaigns"
  ON campaign_media FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM campaigns
    WHERE campaigns.id = campaign_media.campaign_id
    AND campaigns.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can delete campaign media for their campaigns" ON campaign_media;
CREATE POLICY "Users can delete campaign media for their campaigns"
  ON campaign_media FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM campaigns
    WHERE campaigns.id = campaign_media.campaign_id
    AND campaigns.user_id = auth.uid()
  ));

-- Enable realtime
-- Enable realtime (commented out to avoid errors if tables are already in the publication)
-- alter publication supabase_realtime add table campaigns;
-- alter publication supabase_realtime add table campaign_media;

-- Insert seed data
INSERT INTO campaigns (id, user_id, title, short_description, story, category, target_amount, current_amount, end_date, organizer_name, organizer_bio, is_public, status, backer_count)
VALUES 
  ('11111111-1111-1111-1111-111111111111', auth.uid(), 'Community Garden Project', 'Help us build a sustainable community garden in the heart of downtown.', '<p>This campaign was started to help fund a new community garden in our neighborhood. The garden will provide fresh produce for local families and serve as an educational space for children to learn about sustainable agriculture.</p><p>We need your support to purchase gardening tools, seeds, soil, and irrigation equipment. We also plan to build accessible pathways and seating areas so everyone in the community can enjoy the space.</p><p>With your help, we can transform an empty lot into a thriving green space that brings people together and improves our local environment. Every donation, no matter how small, brings us closer to our goal!</p><p>Thank you for your support and for being part of our community garden journey!</p>', 'community', 5000, 3750, NOW() + INTERVAL '30 days', 'Sarah Johnson', 'Community organizer and gardening enthusiast', true, 'active', 42);

INSERT INTO campaigns (id, user_id, title, short_description, story, category, target_amount, current_amount, end_date, organizer_name, organizer_bio, is_public, status, backer_count)
VALUES
  ('22222222-2222-2222-2222-222222222222', auth.uid(), 'Local Animal Shelter Renovation', 'Renovating our facilities to help more animals find their forever homes.', '<p>Our animal shelter has been serving the community for over 10 years, but our facilities are in desperate need of renovation. We want to create a more comfortable environment for the animals in our care and improve our adoption areas to help more pets find loving homes.</p><p>The funds raised will go toward upgrading kennels, improving ventilation systems, creating a dedicated medical treatment room, and renovating our meet-and-greet spaces where potential adopters can interact with animals.</p><p>Every contribution helps us create a better shelter for animals in need. Thank you for your support!</p>', 'animals', 10000, 10000, NOW() - INTERVAL '5 days', 'James Wilson', 'Shelter director with 15 years of animal welfare experience', true, 'completed', 137);

INSERT INTO campaigns (id, user_id, title, short_description, story, category, target_amount, current_amount, end_date, organizer_name, organizer_bio, is_public, status, backer_count)
VALUES
  ('33333333-3333-3333-3333-333333333333', auth.uid(), 'Tech Education for Underserved Youth', 'Providing coding classes and computer equipment to underserved communities.', '<p>We believe that every child deserves access to technology education, regardless of their background or economic status. This campaign aims to provide coding classes and computer equipment to youth in underserved communities.</p><p>With your support, we plan to establish after-school coding programs, purchase laptops and tablets for students who do not have access to technology at home, and train teachers to incorporate tech education into their curriculum.</p><p>By bridging the digital divide, we can help prepare the next generation for success in an increasingly technology-driven world. Join us in making this vision a reality!</p>', 'education', 7500, 0, NOW() + INTERVAL '60 days', 'Michael Chen', 'Education technology specialist and former teacher', true, 'draft', 0);

INSERT INTO campaigns (id, user_id, title, short_description, story, category, target_amount, current_amount, end_date, organizer_name, organizer_bio, is_public, status, backer_count)
VALUES
  ('44444444-4444-4444-4444-444444444444', auth.uid(), 'Neighborhood Cleanup Initiative', 'Organizing monthly cleanup events to beautify our local neighborhoods.', '<p>Our neighborhood cleanup initiative aims to bring community members together to beautify our local streets, parks, and public spaces. We believe that clean, well-maintained neighborhoods foster pride, improve safety, and enhance quality of life for all residents.</p><p>Funds raised will be used to purchase cleanup supplies, organize monthly community events, install additional trash and recycling bins in high-traffic areas, and develop educational materials about waste reduction and environmental stewardship.</p><p>Join us in making our community cleaner, greener, and more beautiful for everyone!</p>', 'community', 2000, 1200, NOW() + INTERVAL '45 days', 'Lisa Rodriguez', 'Environmental activist and community organizer', true, 'active', 28);

INSERT INTO campaign_media (campaign_id, file_path, file_type, caption, is_cover, display_order)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'campaigns/garden1.jpg', 'image', 'Example of what our garden could look like when completed', true, 0);

INSERT INTO campaign_media (campaign_id, file_path, file_type, caption, is_cover, display_order)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'campaigns/garden2.jpg', 'image', 'The empty lot we plan to transform into a community garden', false, 1);

INSERT INTO campaign_media (campaign_id, file_path, file_type, caption, is_cover, display_order)
VALUES
  ('22222222-2222-2222-2222-222222222222', 'campaigns/shelter1.jpg', 'image', 'Some of the animals that will benefit from the shelter renovation', true, 0);

INSERT INTO campaign_media (campaign_id, file_path, file_type, caption, is_cover, display_order)
VALUES
  ('33333333-3333-3333-3333-333333333333', 'campaigns/education1.jpg', 'image', 'Students learning to code', true, 0);

INSERT INTO campaign_media (campaign_id, file_path, file_type, caption, is_cover, display_order)
VALUES
  ('44444444-4444-4444-4444-444444444444', 'campaigns/cleanup1.jpg', 'image', 'Volunteers at a recent neighborhood cleanup event', true, 0);