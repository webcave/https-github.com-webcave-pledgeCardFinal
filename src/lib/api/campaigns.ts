import { supabase, checkDatabaseConnection } from "@/lib/supabase";
import { TablesInsert } from "@/types/supabase";
import {
  storeCampaign,
  retrieveCampaign,
  retrieveAllCampaigns,
  isUsingFallbackStorage,
} from "@/lib/fallbackStorage";

// Get all campaigns
export async function getCampaigns() {
  try {
    // Check if we should use fallback storage
    if (isUsingFallbackStorage()) {
      const campaigns = retrieveAllCampaigns().filter(
        (c) => c.is_public && c.status === "active",
      );
      return { data: campaigns, error: null };
    }

    // Try to get from database
    const result = await supabase
      .from("campaigns")
      .select("*")
      .eq("is_public", true)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    // If there's an error, try fallback
    if (result.error) {
      console.error("Error fetching campaigns, using fallback:", result.error);
      await checkDatabaseConnection(); // Update connection status
      const campaigns = retrieveAllCampaigns().filter(
        (c) => c.is_public && c.status === "active",
      );
      return { data: campaigns, error: null };
    }

    return result;
  } catch (error) {
    console.error("Unexpected error in getCampaigns:", error);
    const campaigns = retrieveAllCampaigns().filter(
      (c) => c.is_public && c.status === "active",
    );
    return { data: campaigns, error: null };
  }
}

// Get a campaign by ID
export async function getCampaignById(id: string) {
  try {
    // Check if we should use fallback storage
    if (isUsingFallbackStorage()) {
      const campaign = retrieveCampaign(id);
      return {
        data: campaign,
        error: campaign ? null : { message: "Campaign not found" },
      };
    }

    // Try to get from database
    const result = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", id)
      .single();

    // If there's an error, try fallback
    if (result.error) {
      console.error("Error fetching campaign, using fallback:", result.error);
      await checkDatabaseConnection(); // Update connection status
      const campaign = retrieveCampaign(id);
      return {
        data: campaign,
        error: campaign ? null : { message: "Campaign not found" },
      };
    }

    return result;
  } catch (error) {
    console.error("Unexpected error in getCampaignById:", error);
    const campaign = retrieveCampaign(id);
    return {
      data: campaign,
      error: campaign ? null : { message: "Campaign not found" },
    };
  }
}

// Get campaigns by category
export async function getCampaignsByCategory(category: string) {
  try {
    // Check if we should use fallback storage
    if (isUsingFallbackStorage()) {
      const campaigns = retrieveAllCampaigns().filter(
        (c) => c.category === category && c.is_public && c.status === "active",
      );
      return { data: campaigns, error: null };
    }

    // Try to get from database
    const result = await supabase
      .from("campaigns")
      .select("*")
      .eq("category", category)
      .eq("is_public", true)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    // If there's an error, try fallback
    if (result.error) {
      console.error(
        "Error fetching campaigns by category, using fallback:",
        result.error,
      );
      await checkDatabaseConnection(); // Update connection status
      const campaigns = retrieveAllCampaigns().filter(
        (c) => c.category === category && c.is_public && c.status === "active",
      );
      return { data: campaigns, error: null };
    }

    return result;
  } catch (error) {
    console.error("Unexpected error in getCampaignsByCategory:", error);
    const campaigns = retrieveAllCampaigns().filter(
      (c) => c.category === category && c.is_public && c.status === "active",
    );
    return { data: campaigns, error: null };
  }
}

// Search campaigns
export async function searchCampaigns(searchTerm: string) {
  try {
    // Check if we should use fallback storage
    if (isUsingFallbackStorage()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const campaigns = retrieveAllCampaigns().filter(
        (c) =>
          (c.title.toLowerCase().includes(lowerSearchTerm) ||
            c.short_description.toLowerCase().includes(lowerSearchTerm) ||
            c.story.toLowerCase().includes(lowerSearchTerm)) &&
          c.is_public &&
          c.status === "active",
      );
      return { data: campaigns, error: null };
    }

    // Try to get from database
    const result = await supabase
      .from("campaigns")
      .select("*")
      .or(
        `title.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%,story.ilike.%${searchTerm}%`,
      )
      .eq("is_public", true)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    // If there's an error, try fallback
    if (result.error) {
      console.error("Error searching campaigns, using fallback:", result.error);
      await checkDatabaseConnection(); // Update connection status
      const lowerSearchTerm = searchTerm.toLowerCase();
      const campaigns = retrieveAllCampaigns().filter(
        (c) =>
          (c.title.toLowerCase().includes(lowerSearchTerm) ||
            c.short_description.toLowerCase().includes(lowerSearchTerm) ||
            c.story.toLowerCase().includes(lowerSearchTerm)) &&
          c.is_public &&
          c.status === "active",
      );
      return { data: campaigns, error: null };
    }

    return result;
  } catch (error) {
    console.error("Unexpected error in searchCampaigns:", error);
    const lowerSearchTerm = searchTerm.toLowerCase();
    const campaigns = retrieveAllCampaigns().filter(
      (c) =>
        (c.title.toLowerCase().includes(lowerSearchTerm) ||
          c.short_description.toLowerCase().includes(lowerSearchTerm) ||
          c.story.toLowerCase().includes(lowerSearchTerm)) &&
        c.is_public &&
        c.status === "active",
    );
    return { data: campaigns, error: null };
  }
}

// Get campaigns by user ID
export async function getUserCampaigns(userId: string) {
  try {
    // Check if we should use fallback storage
    if (isUsingFallbackStorage()) {
      const campaigns = retrieveAllCampaigns().filter(
        (c) => c.user_id === userId,
      );
      return { data: campaigns, error: null };
    }

    // Try to get from database
    const result = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    // If there's an error, try fallback
    if (result.error) {
      console.error(
        "Error fetching user campaigns, using fallback:",
        result.error,
      );
      await checkDatabaseConnection(); // Update connection status
      const campaigns = retrieveAllCampaigns().filter(
        (c) => c.user_id === userId,
      );
      return { data: campaigns, error: null };
    }

    return result;
  } catch (error) {
    console.error("Unexpected error in getUserCampaigns:", error);
    const campaigns = retrieveAllCampaigns().filter(
      (c) => c.user_id === userId,
    );
    return { data: campaigns, error: null };
  }
}

// Create a new campaign
export async function createCampaign(campaignData: TablesInsert<"campaigns">) {
  try {
    // Ensure required fields are present
    if (
      !campaignData.title ||
      !campaignData.short_description ||
      !campaignData.story ||
      !campaignData.category ||
      !campaignData.target_amount ||
      !campaignData.end_date ||
      !campaignData.organizer_name
    ) {
      return {
        data: null,
        error: { message: "Missing required campaign fields" },
      };
    }

    // Set default values if not provided
    const campaign = {
      ...campaignData,
      current_amount: campaignData.current_amount || 0,
      is_public:
        typeof campaignData.is_public === "boolean"
          ? campaignData.is_public
          : true,
      status: campaignData.status || "active",
      backer_count: campaignData.backer_count || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Make sure target_amount is a number
      target_amount:
        typeof campaignData.target_amount === "string"
          ? parseFloat(campaignData.target_amount)
          : campaignData.target_amount,
    };

    // Check if we should use fallback storage
    if (isUsingFallbackStorage()) {
      // Store in fallback storage
      const savedCampaign = storeCampaign(campaign);
      return { data: savedCampaign, error: null };
    }

    // Try to insert into database
    try {
      const result = await supabase
        .from("campaigns")
        .insert(campaign)
        .select("*")
        .single();

      // If there's an error, use fallback
      if (result.error) {
        console.error("Error creating campaign, using fallback:", result.error);
        await checkDatabaseConnection(); // Update connection status
        const savedCampaign = storeCampaign(campaign);
        return { data: savedCampaign, error: null };
      }

      return result;
    } catch (dbError) {
      console.error(
        "Database error in createCampaign, using fallback:",
        dbError,
      );
      await checkDatabaseConnection(); // Update connection status
      const savedCampaign = storeCampaign(campaign);
      return { data: savedCampaign, error: null };
    }
  } catch (error) {
    console.error("Unexpected error in createCampaign:", error);
    // Store in fallback storage as a last resort
    const savedCampaign = storeCampaign(campaignData as any);
    return { data: savedCampaign, error: null };
  }
}

// Update a campaign
export async function updateCampaign(
  id: string,
  campaignData: Partial<TablesInsert<"campaigns">>,
) {
  try {
    const updateData = {
      ...campaignData,
      updated_at: new Date().toISOString(),
    };

    // Check if we should use fallback storage
    if (isUsingFallbackStorage()) {
      // Get existing campaign
      const existingCampaign = retrieveCampaign(id);
      if (!existingCampaign) {
        return {
          data: null,
          error: { message: "Campaign not found" },
        };
      }

      // Update and store
      const updatedCampaign = { ...existingCampaign, ...updateData };
      const savedCampaign = storeCampaign(updatedCampaign);
      return { data: savedCampaign, error: null };
    }

    // Try to update in database
    const result = await supabase
      .from("campaigns")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single();

    // If there's an error, use fallback
    if (result.error) {
      console.error("Error updating campaign, using fallback:", result.error);
      await checkDatabaseConnection(); // Update connection status

      // Get existing campaign
      const existingCampaign = retrieveCampaign(id);
      if (!existingCampaign) {
        return {
          data: null,
          error: { message: "Campaign not found" },
        };
      }

      // Update and store
      const updatedCampaign = { ...existingCampaign, ...updateData };
      const savedCampaign = storeCampaign(updatedCampaign);
      return { data: savedCampaign, error: null };
    }

    return result;
  } catch (error) {
    console.error("Unexpected error in updateCampaign:", error);
    // Try fallback as a last resort
    const existingCampaign = retrieveCampaign(id);
    if (!existingCampaign) {
      return {
        data: null,
        error: { message: "Campaign not found" },
      };
    }

    const updatedCampaign = {
      ...existingCampaign,
      ...campaignData,
      updated_at: new Date().toISOString(),
    };
    const savedCampaign = storeCampaign(updatedCampaign);
    return { data: savedCampaign, error: null };
  }
}

// Delete a campaign
export async function deleteCampaign(id: string) {
  try {
    // For now, we'll just return success for fallback storage
    // In a real implementation, we would mark the campaign for deletion
    // when connection is restored
    if (isUsingFallbackStorage()) {
      return { error: null };
    }

    return await supabase.from("campaigns").delete().eq("id", id);
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return {
      error: { message: error.message || "Failed to delete campaign" },
    };
  }
}

// Add campaign media
export async function addCampaignMedia(
  mediaData: TablesInsert<"campaign_media">,
) {
  try {
    if (
      !mediaData.campaign_id ||
      !mediaData.file_path ||
      !mediaData.file_type
    ) {
      return {
        data: null,
        error: { message: "Missing required media fields" },
      };
    }

    const media = {
      ...mediaData,
      is_cover:
        typeof mediaData.is_cover === "boolean" ? mediaData.is_cover : false,
      display_order: mediaData.display_order || 0,
      created_at: new Date().toISOString(),
    };

    // For fallback storage, we'll just update the campaign with the media info
    if (isUsingFallbackStorage()) {
      // Get the campaign
      const campaign = retrieveCampaign(mediaData.campaign_id);
      if (!campaign) {
        return {
          data: null,
          error: { message: "Campaign not found" },
        };
      }

      // Add media to campaign
      if (!campaign.media) campaign.media = [];
      campaign.media.push(media);

      // Save updated campaign
      storeCampaign(campaign);

      return { data: media, error: null };
    }

    return await supabase
      .from("campaign_media")
      .insert(media)
      .select()
      .single();
  } catch (error) {
    console.error("Error adding campaign media:", error);
    return {
      data: null,
      error: { message: error.message || "Failed to add campaign media" },
    };
  }
}

// Delete campaign media
export async function deleteCampaignMedia(id: string) {
  try {
    // For fallback storage, we would need to implement this
    if (isUsingFallbackStorage()) {
      return { error: null };
    }

    return await supabase.from("campaign_media").delete().eq("id", id);
  } catch (error) {
    console.error("Error deleting campaign media:", error);
    return {
      error: { message: error.message || "Failed to delete campaign media" },
    };
  }
}

// Update campaign media
export async function updateCampaignMedia(
  id: string,
  mediaData: Partial<TablesInsert<"campaign_media">>,
) {
  try {
    // For fallback storage, we would need to implement this
    if (isUsingFallbackStorage()) {
      return { data: mediaData, error: null };
    }

    return await supabase
      .from("campaign_media")
      .update(mediaData)
      .eq("id", id)
      .select()
      .single();
  } catch (error) {
    console.error("Error updating campaign media:", error);
    return {
      data: null,
      error: { message: error.message || "Failed to update campaign media" },
    };
  }
}
