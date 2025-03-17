import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CampaignDetail from "./CampaignDetail";
import Navbar from "../layout/Navbar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DonationForm from "../donations/DonationForm";
import PledgeForm from "../pledges/PledgeForm";

const CampaignWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [campaign, setCampaign] = useState(null);
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

  // Fetch campaign data
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate loading and then use mock data
    setIsLoading(true);
    setTimeout(() => {
      // Mock campaign data based on the ID
      const mockCampaign = {
        id: id,
        title: "Help Fund Our Community Garden Project",
        image:
          "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&q=80",
        currentAmount: 8750,
        goalAmount: 15000,
        daysLeft: 21,
        backerCount: 143,
        category: "Community",
        organizerName: "Sarah Johnson",
        organizerAvatar:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        organizerLocation: "Portland, OR",
        campaignCreatedDate: "March 15, 2023",
        story:
          "<p>This campaign was started to help fund a new community garden in our neighborhood. The garden will provide fresh produce for local families and serve as an educational space for children to learn about sustainable agriculture.</p><p>We need your support to purchase gardening tools, seeds, soil, and irrigation equipment. We also plan to build accessible pathways and seating areas so everyone in the community can enjoy the space.</p><p>With your help, we can transform an empty lot into a thriving green space that brings people together and improves our local environment. Every donation, no matter how small, brings us closer to our goal!</p><p>Thank you for your support and for being part of our community garden journey!</p>",
        media: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
            caption:
              "The empty lot we plan to transform into a community garden",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
            caption:
              "Example of what our garden could look like when completed",
          },
        ],
      };
      setCampaign(mockCampaign);
      setIsLoading(false);
    }, 1000);
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
