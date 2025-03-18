import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import CampaignCreationForm from "./CampaignCreationForm";
import { getCampaignById, updateCampaign } from "@/lib/api/dummyApi";
import { useAuth } from "@/contexts/DummyAuthContext";
import PageLayout from "../layout/PageLayout";

const CampaignEditWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [campaign, setCampaign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCampaign = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await getCampaignById(id);

        if (error || !data) {
          throw new Error(error?.message || "Campaign not found");
        }

        // Check if the user is the owner of the campaign
        if (user?.id !== data.user_id) {
          toast({
            title: "Unauthorized",
            description: "You don't have permission to edit this campaign",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }

        setCampaign(data);
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "Failed to load campaign",
          variant: "destructive",
        });
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id, user, navigate]);

  const handleSubmit = async (data: any, mediaFiles: File[]) => {
    if (!user || !id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to edit this campaign",
        variant: "destructive",
      });
      navigate("/login?redirect=/dashboard");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format the data for the API
      const campaignData = {
        title: data.title,
        short_description: data.shortDescription,
        story: data.story,
        category: data.category,
        target_amount: parseFloat(data.targetAmount),
        end_date: new Date(data.endDate).toISOString(),
        organizer_name: data.organizerName,
        organizer_bio: data.organizerBio || "",
        is_public: data.isPublic,
      };

      // Update the campaign
      const { data: updatedCampaign, error } = await updateCampaign(
        id,
        campaignData,
      );

      if (error || !updatedCampaign) {
        throw new Error(error?.message || "Failed to update campaign");
      }

      // Handle media files if needed (for a complete implementation)
      // This would involve deleting existing media and uploading new ones

      toast({
        title: "Campaign updated",
        description: "Your campaign has been updated successfully",
      });

      // Redirect to the campaign page
      navigate(`/campaigns/${id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update campaign",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!campaign) {
    return (
      <PageLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Campaign not found</h2>
            <p className="mt-2 text-muted-foreground">
              The campaign you're looking for doesn't exist or you don't have
              permission to edit it.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Format the campaign data for the form
  const initialData = {
    title: campaign.title,
    category: campaign.category,
    targetAmount: campaign.target_amount.toString(),
    endDate: new Date(campaign.end_date).toISOString().split("T")[0],
    story: campaign.story,
    shortDescription: campaign.short_description,
    organizerName: campaign.organizer_name,
    organizerBio: campaign.organizer_bio || "",
    isPublic: campaign.is_public,
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <CampaignCreationForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isEditing={true}
          isSubmitting={isSubmitting}
        />
      </div>
    </PageLayout>
  );
};

export default CampaignEditWrapper;
