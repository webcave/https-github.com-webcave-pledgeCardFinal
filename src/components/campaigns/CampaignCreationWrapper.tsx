import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import CampaignCreationForm from "./CampaignCreationForm";
import { createCampaign, updateCampaign } from "@/lib/api/campaigns";
import {
  supabase,
  checkDatabaseConnection,
  initializeDatabase,
} from "@/lib/supabase";
import { useAuth } from "@/contexts/DummyAuthContext";
import PageLayout from "../layout/PageLayout";
import SuccessAnimation from "@/components/ui/success-animation";
import ConnectionStatus from "@/components/ui/connection-status";
import { isUsingFallbackStorage } from "@/lib/fallbackStorage";

const CampaignCreationWrapper = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdCampaignId, setCreatedCampaignId] = useState<string | null>(
    null,
  );
  const [dbInitialized, setDbInitialized] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  // Check database connection and initialize on component mount
  useEffect(() => {
    const setupDatabase = async () => {
      const isConnected = await checkDatabaseConnection();
      setOfflineMode(!isConnected);

      if (isConnected) {
        const isInitialized = await initializeDatabase();
        setDbInitialized(isInitialized);
      } else {
        setDbInitialized(false);
      }
    };

    setupDatabase();
  }, []);

  const handleSubmit = async (data: any, mediaFiles: File[]) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a campaign",
        variant: "destructive",
      });
      navigate("/login?redirect=/campaigns/create");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format the data for the API
      const campaignData = {
        user_id: user.id,
        title: data.title,
        short_description: data.shortDescription,
        story: data.story,
        category: data.category,
        target_amount: parseFloat(data.targetAmount),
        end_date: new Date(data.endDate).toISOString(),
        organizer_name: data.organizerName,
        organizer_bio: data.organizerBio || "",
        is_public: data.isPublic,
        status: "active",
      };

      // Create the campaign
      const { data: campaign, error } = await createCampaign(campaignData);

      if (error || !campaign) {
        throw new Error(error?.message || "Failed to create campaign");
      }

      // Generate a random image for the campaign cover
      if (campaign && campaign.id) {
        // Use themed images based on campaign category
        const categoryImageMap = {
          medical: ["health", "hospital", "doctor", "medicine"],
          education: ["school", "learning", "books", "students"],
          emergency: ["emergency", "disaster", "relief", "help"],
          community: ["community", "neighborhood", "people", "together"],
          animals: ["animals", "pets", "wildlife", "conservation"],
          environment: ["nature", "environment", "climate", "conservation"],
          nonprofit: ["charity", "volunteer", "community", "helping"],
          other: ["inspiration", "support", "help", "change"],
        };

        // Get themes based on category or use default themes
        const categoryThemes = categoryImageMap[data.category] || [
          "nature",
          "community",
          "education",
          "health",
          "technology",
          "art",
        ];

        const theme =
          categoryThemes[Math.floor(Math.random() * categoryThemes.length)];

        // Use static images instead of dynamic Unsplash URLs to avoid CORS issues
        const imageMap = {
          health:
            "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80",
          hospital:
            "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
          doctor:
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80",
          medicine:
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80",
          school:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
          learning:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
          books:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80",
          students:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
          emergency:
            "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=1200&q=80",
          disaster:
            "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=1200&q=80",
          relief:
            "https://images.unsplash.com/photo-1469571486292-b53601010b89?w=1200&q=80",
          help: "https://images.unsplash.com/photo-1469571486292-b53601010b89?w=1200&q=80",
          community:
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
          neighborhood:
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
          people:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
          together:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
          animals:
            "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200&q=80",
          pets: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200&q=80",
          wildlife:
            "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80",
          conservation:
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
          nature:
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
          environment:
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
          climate:
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
          charity:
            "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80",
          volunteer:
            "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80",
          inspiration:
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80",
          support:
            "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=1200&q=80",
          change:
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80",
          technology:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
          art: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&q=80",
        };

        // Use the static image or a default one
        const coverImageUrl =
          imageMap[theme] ||
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80";

        // Log the image that would be used
        console.log(
          `Using ${theme} image for ${data.category} campaign: ${coverImageUrl}`,
        );

        // Update the campaign with a cover_image field
        try {
          // First, update the campaign object in memory
          if (campaign.data) {
            campaign.data.cover_image = coverImageUrl;
          } else {
            campaign.cover_image = coverImageUrl;
          }

          // Then update in storage based on mode
          if (isUsingFallbackStorage()) {
            // If using fallback, we need to update the campaign in local storage
            await updateCampaign(campaign.id, { cover_image: coverImageUrl });
          } else {
            // Otherwise update in the database
            const { error } = await supabase
              .from("campaigns")
              .update({ cover_image: coverImageUrl })
              .eq("id", campaign.id);

            if (error) {
              console.error(
                "Database update failed, falling back to local storage",
                error,
              );
              await updateCampaign(campaign.id, { cover_image: coverImageUrl });
            }
          }
        } catch (err) {
          console.error("Error updating campaign with cover image:", err);
          // Even if there's an error, we'll continue with the success flow
          // since the campaign was created successfully
        }
      }

      // Generate a creative success message
      const successMessages = [
        "Your campaign is now live and ready to change the world!",
        "Congratulations! Your vision is now ready to inspire others.",
        "Amazing! Your campaign is now visible to potential supporters.",
        "Success! Your fundraising journey has officially begun.",
        "Fantastic! Your campaign is now part of our global community.",
      ];
      const randomMessage =
        successMessages[Math.floor(Math.random() * successMessages.length)];

      // Store the campaign ID and show success animation
      setCreatedCampaignId(campaign.id);
      setShowSuccess(true);

      // Also show a toast notification
      toast({
        title: "🚀 Campaign Launched!",
        description: randomMessage,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessComplete = () => {
    if (createdCampaignId) {
      navigate(`/campaigns/${createdCampaignId}`);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4 relative">
        {/* Connection Status Indicator */}
        <div className="absolute top-0 right-0 mt-4 mr-4 z-10">
          <ConnectionStatus />
        </div>

        {/* Offline Mode Banner */}
        {offlineMode && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  You're currently in offline mode. Your campaign will be saved
                  locally and synchronized when your connection is restored.
                </p>
              </div>
            </div>
          </div>
        )}

        <CampaignCreationForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />

        {/* Success Animation */}
        <SuccessAnimation
          show={showSuccess}
          message="Campaign Successfully Launched!"
          subMessage={
            isUsingFallbackStorage()
              ? "Your campaign has been saved locally and will be synchronized when your connection is restored."
              : "Your campaign is now live and ready to change the world!"
          }
          onComplete={handleSuccessComplete}
          duration={3000}
        />
      </div>
    </PageLayout>
  );
};

export default CampaignCreationWrapper;
