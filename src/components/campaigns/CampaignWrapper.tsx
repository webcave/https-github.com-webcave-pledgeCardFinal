import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CampaignDetail from "./CampaignDetail";
import Navbar from "../layout/Navbar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DonationForm from "../donations/DonationForm";
import PledgeForm from "../pledges/PledgeForm";
import { getCampaignById } from "@/lib/api/campaigns";
import { getPublicUrl } from "@/lib/api/storage";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";

interface CampaignData {
  id: string;
  title: string;
  image: string;
  currentAmount: number;
  goalAmount: number;
  daysLeft: number;
  backerCount: number;
  category: string;
  organizerName: string;
  organizerAvatar: string;
  organizerLocation: string;
  campaignCreatedDate: string;
  story: string;
  media: Array<{
    type: "image" | "video";
    url: string;
    caption?: string;
  }>;
}

const CampaignWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if we should open the pledge modal from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("pledge") === "true") {
      setIsPledgeModalOpen(true);
      // Clean up the URL
      navigate(`/campaigns/${id}`, { replace: true });
    }
    if (searchParams.get("donate") === "true") {
      setIsDonateModalOpen(true);
      // Clean up the URL
      navigate(`/campaigns/${id}`, { replace: true });
    }
  }, [location, id, navigate]);

  // Fetch campaign data from the database
  useEffect(() => {
    if (!id) return;

    const fetchCampaign = async () => {
      setIsLoading(true);

      try {
        const { data, error } = await getCampaignById(id);

        if (error || !data) {
          throw new Error(error?.message || "Campaign not found");
        }

        // Calculate days left
        const endDate = new Date(data.end_date);
        const today = new Date();
        const daysLeft = Math.max(0, differenceInDays(endDate, today));

        // Format the campaign data
        const formattedCampaign: CampaignData = {
          id: data.id,
          title: data.title,
          image:
            data.media && data.media.length > 0 && data.media[0].file_path
              ? getPublicUrl(data.media[0].file_path)
              : "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&q=80",
          currentAmount: data.current_amount,
          goalAmount: data.target_amount,
          daysLeft: daysLeft,
          backerCount: data.backer_count,
          category: data.category,
          organizerName: data.organizer_name,
          organizerAvatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
            data.organizer_name.replace(/\s+/g, "").toLowerCase(),
          organizerLocation: "Kampala, UG", // Default location
          campaignCreatedDate: format(
            new Date(data.created_at),
            "MMMM d, yyyy",
          ),
          story: data.story,
          media: data.media
            ? data.media.map((item) => ({
                type: item.file_type as "image" | "video",
                url: getPublicUrl(item.file_path),
                caption: item.caption || undefined,
              }))
            : [],
        };

        setCampaign(formattedCampaign);
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setCampaign(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDonateClick = () => {
    setIsDonateModalOpen(true);
  };

  const handlePledgeClick = () => {
    setIsPledgeModalOpen(true);
  };

  const handleDonationComplete = (data: any) => {
    console.log("Donation completed:", data);
    setIsDonateModalOpen(false);
    // Could show a success message or redirect
  };

  const handlePledgeComplete = (data: any) => {
    console.log("Pledge saved:", data);
    setIsPledgeModalOpen(false);
    // Could show a success message or redirect
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading campaign details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Campaign Not Found
            </h2>
            <p className="mt-2 text-gray-600">
              The campaign you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <CampaignDetail
        {...campaign}
        onDonateClick={handleDonateClick}
        onPledgeClick={handlePledgeClick}
      />

      {/* Donation Modal */}
      <Dialog open={isDonateModalOpen} onOpenChange={setIsDonateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DonationForm
            campaignId={id}
            campaignTitle={campaign.title}
            onDonationComplete={handleDonationComplete}
          />
        </DialogContent>
      </Dialog>

      {/* Pledge Modal */}
      <Dialog open={isPledgeModalOpen} onOpenChange={setIsPledgeModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <PledgeForm
            campaignId={id}
            campaignTitle={campaign.title}
            onSubmit={handlePledgeComplete}
            onCancel={() => setIsPledgeModalOpen(false)}
            isOpen={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignWrapper;
