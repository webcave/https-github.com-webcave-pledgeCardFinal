/**
 * Fallback storage system for when the database is unavailable
 * Uses localStorage to store data temporarily
 */

const STORAGE_PREFIX = "pledgecard_fallback_";

// Store data in localStorage
export function storeData(key: string, data: any): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
  } catch (error) {
    console.error("Error storing data in fallback storage:", error);
  }
}

// Retrieve data from localStorage
export function retrieveData<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving data from fallback storage:", error);
    return null;
  }
}

// Store a campaign in fallback storage
export function storeCampaign(campaign: any): void {
  // Generate a temporary ID if none exists
  if (!campaign.id) {
    campaign.id = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  // Store the individual campaign
  storeData(`campaign_${campaign.id}`, campaign);

  // Update the campaign list
  const campaignList = retrieveCampaignList() || [];
  if (!campaignList.includes(campaign.id)) {
    campaignList.push(campaign.id);
    storeData("campaign_list", campaignList);
  }

  return campaign;
}

// Retrieve all campaigns from fallback storage
export function retrieveCampaignList(): string[] {
  return retrieveData<string[]>("campaign_list") || [];
}

// Retrieve a specific campaign from fallback storage
export function retrieveCampaign(id: string): any {
  return retrieveData(`campaign_${id}`);
}

// Retrieve all campaigns from fallback storage
export function retrieveAllCampaigns(): any[] {
  const campaignList = retrieveCampaignList();
  return campaignList.map((id) => retrieveCampaign(id)).filter(Boolean);
}

// Clear all fallback storage data
export function clearFallbackStorage(): void {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(STORAGE_PREFIX))
    .forEach((key) => localStorage.removeItem(key));
}

// Check if we're using fallback storage
export function isUsingFallbackStorage(): boolean {
  return localStorage.getItem(`${STORAGE_PREFIX}using_fallback`) === "true";
}

// Set fallback storage mode
export function setFallbackStorageMode(isUsing: boolean): void {
  localStorage.setItem(
    `${STORAGE_PREFIX}using_fallback`,
    isUsing ? "true" : "false",
  );
}
