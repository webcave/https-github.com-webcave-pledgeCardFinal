import {
  dummyCampaigns,
  dummyDonations,
  dummyPledges,
  dummyUsers,
  getImageUrl,
} from "../dummyData";

// Campaign API functions
export async function getCampaigns() {
  return {
    data: dummyCampaigns.filter(
      (campaign) => campaign.is_public && campaign.status === "active",
    ),
    error: null,
  };
}

export async function getCampaignById(id: string) {
  const campaign = dummyCampaigns.find((c) => c.id === id);
  return {
    data: campaign || null,
    error: campaign ? null : { message: "Campaign not found" },
  };
}

export async function getCampaignsByCategory(category: string) {
  return {
    data: dummyCampaigns.filter(
      (campaign) =>
        campaign.category === category &&
        campaign.is_public &&
        campaign.status === "active",
    ),
    error: null,
  };
}

export async function searchCampaigns(searchTerm: string) {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return {
    data: dummyCampaigns.filter(
      (campaign) =>
        (campaign.title.toLowerCase().includes(lowerSearchTerm) ||
          campaign.short_description.toLowerCase().includes(lowerSearchTerm) ||
          campaign.story.toLowerCase().includes(lowerSearchTerm)) &&
        campaign.is_public &&
        campaign.status === "active",
    ),
    error: null,
  };
}

export async function getUserCampaigns(userId: string) {
  return {
    data: dummyCampaigns.filter((campaign) => campaign.user_id === userId),
    error: null,
  };
}

export async function createCampaign(campaignData: any) {
  const newId = (dummyCampaigns.length + 1).toString();
  const newCampaign = {
    id: newId,
    ...campaignData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    current_amount: 0,
    backer_count: 0,
    media: [],
  };

  dummyCampaigns.push(newCampaign);

  return {
    data: newCampaign,
    error: null,
  };
}

export async function updateCampaign(id: string, campaignData: any) {
  const index = dummyCampaigns.findIndex((c) => c.id === id);

  if (index === -1) {
    return {
      data: null,
      error: { message: "Campaign not found" },
    };
  }

  const updatedCampaign = {
    ...dummyCampaigns[index],
    ...campaignData,
    updated_at: new Date().toISOString(),
  };

  dummyCampaigns[index] = updatedCampaign;

  return {
    data: updatedCampaign,
    error: null,
  };
}

export async function deleteCampaign(id: string) {
  const index = dummyCampaigns.findIndex((c) => c.id === id);

  if (index === -1) {
    return {
      error: { message: "Campaign not found" },
    };
  }

  dummyCampaigns.splice(index, 1);

  return {
    error: null,
  };
}

export async function addCampaignMedia(mediaData: any) {
  const campaign = dummyCampaigns.find((c) => c.id === mediaData.campaign_id);

  if (!campaign) {
    return {
      data: null,
      error: { message: "Campaign not found" },
    };
  }

  const newId = (campaign.media.length + 1).toString();
  const newMedia = {
    id: newId,
    ...mediaData,
    created_at: new Date().toISOString(),
  };

  campaign.media.push(newMedia);

  return {
    data: newMedia,
    error: null,
  };
}

export async function deleteCampaignMedia(id: string) {
  for (const campaign of dummyCampaigns) {
    const mediaIndex = campaign.media.findIndex((m) => m.id === id);

    if (mediaIndex !== -1) {
      campaign.media.splice(mediaIndex, 1);
      return {
        error: null,
      };
    }
  }

  return {
    error: { message: "Media not found" },
  };
}

export async function updateCampaignMedia(id: string, mediaData: any) {
  for (const campaign of dummyCampaigns) {
    const mediaIndex = campaign.media.findIndex((m) => m.id === id);

    if (mediaIndex !== -1) {
      const updatedMedia = {
        ...campaign.media[mediaIndex],
        ...mediaData,
      };

      campaign.media[mediaIndex] = updatedMedia;

      return {
        data: updatedMedia,
        error: null,
      };
    }
  }

  return {
    data: null,
    error: { message: "Media not found" },
  };
}

// Auth API functions
export async function signUp(email: string, password: string) {
  // Simulate user creation
  const newUser = {
    id: (dummyUsers.length + 1).toString(),
    email,
    name: email.split("@")[0],
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    created_at: new Date().toISOString(),
  };

  dummyUsers.push(newUser);

  return {
    data: { user: newUser },
    error: null,
  };
}

export async function signIn(email: string, password: string) {
  // Find user by email (in a real app, would also check password)
  const user = dummyUsers.find((u) => u.email === email);

  if (!user) {
    return {
      data: null,
      error: { message: "Invalid login credentials" },
    };
  }

  return {
    data: { user },
    error: null,
  };
}

export async function signOut() {
  return { error: null };
}

export async function getCurrentUser() {
  // For demo purposes, always return the first user
  return { user: dummyUsers[0], error: null };
}

export async function getSession() {
  // For demo purposes, always return a session with the first user
  return {
    session: { user: dummyUsers[0] },
    error: null,
  };
}

// Storage API functions
export async function uploadFile(path: string, file: File) {
  // Simulate file upload
  return {
    data: { path },
    error: null,
  };
}

export function getPublicUrl(path: string) {
  return getImageUrl(path);
}

export async function deleteFile(path: string) {
  return { error: null };
}

// Donation and Pledge API functions
export async function createDonation(donationData: any) {
  const newId = (dummyDonations.length + 1).toString();
  const newDonation = {
    id: newId,
    ...donationData,
    status: "completed",
    created_at: new Date().toISOString(),
  };

  dummyDonations.push(newDonation);

  // Update campaign amount and backer count
  const campaign = dummyCampaigns.find(
    (c) => c.id === donationData.campaign_id,
  );
  if (campaign) {
    campaign.current_amount += donationData.amount;
    campaign.backer_count += 1;
  }

  return {
    data: newDonation,
    error: null,
  };
}

export async function getUserDonations(userId: string) {
  return {
    data: dummyDonations.filter((donation) => donation.user_id === userId),
    error: null,
  };
}

export async function createPledge(pledgeData: any) {
  const newId = (dummyPledges.length + 1).toString();
  const newPledge = {
    id: newId,
    ...pledgeData,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  dummyPledges.push(newPledge);

  return {
    data: newPledge,
    error: null,
  };
}

export async function getUserPledges(userId: string) {
  return {
    data: dummyPledges.filter((pledge) => pledge.user_id === userId),
    error: null,
  };
}

export async function updatePledge(id: string, pledgeData: any) {
  const index = dummyPledges.findIndex((p) => p.id === id);

  if (index === -1) {
    return {
      data: null,
      error: { message: "Pledge not found" },
    };
  }

  const updatedPledge = {
    ...dummyPledges[index],
    ...pledgeData,
  };

  dummyPledges[index] = updatedPledge;

  return {
    data: updatedPledge,
    error: null,
  };
}

export async function deletePledge(id: string) {
  const index = dummyPledges.findIndex((p) => p.id === id);

  if (index === -1) {
    return {
      error: { message: "Pledge not found" },
    };
  }

  dummyPledges.splice(index, 1);

  return {
    error: null,
  };
}

export async function convertPledgeToDonation(pledgeId: string) {
  const pledge = dummyPledges.find((p) => p.id === pledgeId);

  if (!pledge) {
    return {
      data: null,
      error: { message: "Pledge not found" },
    };
  }

  // Create a new donation based on the pledge
  const donationResult = await createDonation({
    campaign_id: pledge.campaign_id,
    user_id: pledge.user_id,
    amount: pledge.amount,
    message: pledge.message,
    is_anonymous: false,
  });

  if (donationResult.error) {
    return donationResult;
  }

  // Delete the pledge
  await deletePledge(pledgeId);

  return {
    data: donationResult.data,
    error: null,
  };
}
