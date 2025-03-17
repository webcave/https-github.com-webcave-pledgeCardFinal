import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import CampaignCreationForm from "./CampaignCreationForm";
import { createCampaign, addCampaignMedia } from "@/lib/api/campaigns";
import { uploadFile } from "@/lib/api/storage";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "../layout/Navbar";

const CampaignCreationWrapper = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Upload media files and create media records
      if (mediaFiles.length > 0) {
        for (let i = 0; i < mediaFiles.length; i++) {
          const file = mediaFiles[i];
          const fileExt = file.name.split(".").pop();
          const filePath = `campaigns/${campaign.id}/${i}-${Date.now()}.${fileExt}`;

          // Upload the file to storage
          const { data: fileData, error: uploadError } = await uploadFile(
            filePath,
            file,
          );

          if (uploadError) {
            console.error("Error uploading file:", uploadError);
            continue;
          }

          // Create a media record in the database
          const mediaData = {
            campaign_id: campaign.id,
            file_path: filePath,
            file_type: file.type.startsWith("image/") ? "image" : "video",
            is_cover: i === 0, // First file is the cover
            display_order: i,
          };

          await addCampaignMedia(mediaData);
        }
      }

      toast({
        title: "Campaign created",
        description: "Your campaign has been created successfully",
      });

      // Redirect to the campaign page
      navigate(`/campaigns/${campaign.id}`);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <CampaignCreationForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CampaignCreationWrapper;
