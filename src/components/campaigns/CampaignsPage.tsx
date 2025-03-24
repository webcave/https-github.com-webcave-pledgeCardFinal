import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import CampaignGrid from "./CampaignGrid";
import { getCampaigns, getImageUrl } from "@/lib/api/dummyApi";
import { toast } from "@/components/ui/use-toast";

const CampaignsPage = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await getCampaigns();
        if (error) throw new Error(error.message);

        // Transform the data to match the expected format for CampaignGrid
        const formattedCampaigns = data.map((campaign) => ({
          id: campaign.id,
          title: campaign.title,
          description: campaign.short_description,
          imageUrl: getImageUrl(
            campaign.media && campaign.media.length > 0
              ? campaign.media[0].file_path
              : "campaigns/default.jpg",
          ),
          currentAmount: campaign.current_amount,
          goalAmount: campaign.target_amount,
          daysLeft: Math.max(
            0,
            Math.floor(
              (new Date(campaign.end_date) - new Date()) /
                (1000 * 60 * 60 * 24),
            ),
          ),
          organizer: campaign.organizer_name,
          category: campaign.category,
        }));

        setCampaigns(formattedCampaigns || []);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError(err.message);
        toast({
          title: "Error",
          description: `Failed to load campaigns: ${err.message}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleDonate = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const handlePledge = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}?pledge=true`);
  };

  return (
    <PageLayout>
      <div className="w-full py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">All Campaigns</h1>
          <p className="text-gray-600 mt-2">
            Browse through our campaigns and support causes that matter to you
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <CampaignGrid
          campaigns={campaigns}
          isLoading={isLoading}
          error={error}
          onDonate={handleDonate}
          onPledge={handlePledge}
        />
      </div>
    </PageLayout>
  );
};

export default CampaignsPage;
