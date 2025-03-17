import { supabase } from "@/lib/supabase";

// Get all campaigns
export async function getCampaigns() {
  return await supabase
    .from("campaigns")
    .select("*, media:campaign_media(*)")
    .eq("is_public", true)
    .eq("status", "active")
    .order("created_at", { ascending: false });
}

// Get a campaign by ID
export async function getCampaignById(id: string) {
  return await supabase
    .from("campaigns")
    .select("*, media:campaign_media(*)")
    .eq("id", id)
    .single();
}

// Get campaigns by category
export async function getCampaignsByCategory(category: string) {
  return await supabase
    .from("campaigns")
    .select("*, media:campaign_media(*)")
    .eq("category", category)
    .eq("is_public", true)
    .eq("status", "active")
    .order("created_at", { ascending: false });
}

// Search campaigns
export async function searchCampaigns(searchTerm: string) {
  return await supabase
    .from("campaigns")
    .select("*, media:campaign_media(*)")
    .or(
      `title.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%,story.ilike.%${searchTerm}%`,
    )
    .eq("is_public", true)
    .eq("status", "active")
    .order("created_at", { ascending: false });
}

// Get campaigns by user ID
export async function getUserCampaigns(userId: string) {
  return await supabase
    .from("campaigns")
    .select("*, media:campaign_media(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

// Create a new campaign
export async function createCampaign(campaignData: any) {
  return await supabase
    .from("campaigns")
    .insert(campaignData)
    .select()
    .single();
}

// Update a campaign
export async function updateCampaign(id: string, campaignData: any) {
  return await supabase
    .from("campaigns")
    .update({ ...campaignData, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
}

// Delete a campaign
export async function deleteCampaign(id: string) {
  return await supabase.from("campaigns").delete().eq("id", id);
}

// Add campaign media
export async function addCampaignMedia(mediaData: any) {
  return await supabase
    .from("campaign_media")
    .insert(mediaData)
    .select()
    .single();
}

// Delete campaign media
export async function deleteCampaignMedia(id: string) {
  return await supabase.from("campaign_media").delete().eq("id", id);
}

// Update campaign media
export async function updateCampaignMedia(id: string, mediaData: any) {
  return await supabase
    .from("campaign_media")
    .update(mediaData)
    .eq("id", id)
    .select()
    .single();
}
