import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CampaignCreationForm from "./CampaignCreationForm";

const CampaignCreationWrapper = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("Campaign created:", data);
    // In a real app, this would save the campaign to the database
    // and then redirect to the campaign page
    navigate("/dashboard/campaigns");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <CampaignCreationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CampaignCreationWrapper;
