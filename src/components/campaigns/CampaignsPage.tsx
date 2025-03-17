import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CampaignGrid from "./CampaignGrid";

const CampaignsPage = () => {
  const navigate = useNavigate();

  const handleDonate = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const handlePledge = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}?pledge=true`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="w-full py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">All Campaigns</h1>
          <p className="text-gray-600 mt-2">
            Browse through our campaigns and support causes that matter to you
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <CampaignGrid onDonate={handleDonate} onPledge={handlePledge} />
      </div>
    </div>
  );
};

export default CampaignsPage;
