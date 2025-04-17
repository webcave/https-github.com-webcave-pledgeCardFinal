import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import CampaignGrid from "./CampaignGrid";
import { getCampaigns } from "@/lib/api/campaigns";
import { getPublicUrl } from "@/lib/api/storage";
import { toast } from "@/components/ui/use-toast";
import InsertDummyDataButton from "@/components/ui/insert-dummy-data-button";

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
        const formattedCampaigns = data.map((campaign) => {
          // Determine image URL based on category
          let imageUrl =
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80";

          // Use media if available
          if (campaign.media && campaign.media.length > 0) {
            imageUrl = getPublicUrl(campaign.media[0].file_path);
          }
          // Otherwise use a category-based image
          else {
            const categoryImages = {
              Education:
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
              Health:
                "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
              Environment:
                "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
              Community:
                "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
              Business:
                "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
              Technology:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
              Arts: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
            };

            imageUrl = categoryImages[campaign.category] || imageUrl;
          }

          return {
            id: campaign.id,
            title: campaign.title,
            description: campaign.short_description,
            imageUrl: imageUrl,
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
          };
        });

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                All Campaigns
              </h1>
              <p className="text-gray-600 mt-2">
                Browse through our campaigns and support causes that matter to
                you
              </p>
            </div>
            <InsertDummyDataButton onSuccess={() => window.location.reload()} />
          </div>
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
