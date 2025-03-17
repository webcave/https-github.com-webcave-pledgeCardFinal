import React from "react";
import CampaignHeader from "./CampaignHeader";
import CampaignStory from "./CampaignStory";
import CampaignSidebar from "./CampaignSidebar";

interface CampaignDetailProps {
  campaignId?: string;
  title?: string;
  image?: string;
  currentAmount?: number;
  goalAmount?: number;
  daysLeft?: number;
  backerCount?: number;
  category?: string;
  organizerName?: string;
  organizerAvatar?: string;
  organizerLocation?: string;
  campaignCreatedDate?: string;
  story?: string;
  media?: Array<{
    type: "image" | "video";
    url: string;
    caption?: string;
  }>;
  onDonateClick?: () => void;
  onPledgeClick?: () => void;
}

const CampaignDetail = ({
  campaignId = "123",
  title = "Help Fund Our Community Garden Project",
  image = "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&q=80",
  currentAmount = 8750,
  goalAmount = 15000,
  daysLeft = 21,
  backerCount = 143,
  category = "Community",
  organizerName = "Sarah Johnson",
  organizerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  organizerLocation = "Kampala, UG",
  campaignCreatedDate = "March 15, 2023",
  story = "<p>This campaign was started to help fund a new community garden in our neighborhood. The garden will provide fresh produce for local families and serve as an educational space for children to learn about sustainable agriculture.</p><p>We need your support to purchase gardening tools, seeds, soil, and irrigation equipment. We also plan to build accessible pathways and seating areas so everyone in the community can enjoy the space.</p><p>With your help, we can transform an empty lot into a thriving green space that brings people together and improves our local environment. Every donation, no matter how small, brings us closer to our goal!</p><p>Thank you for your support and for being part of our community garden journey!</p>",
  media = [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
      caption: "The empty lot we plan to transform into a community garden",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
      caption: "Example of what our garden could look like when completed",
    },
  ],
  onDonateClick = () => {},
  onPledgeClick = () => {},
}: CampaignDetailProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      {/* Campaign Header Section */}
      <CampaignHeader
        title={title}
        image={image}
        currentAmount={currentAmount}
        goalAmount={goalAmount}
        daysLeft={daysLeft}
        backerCount={backerCount}
        category={category}
      />

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Main Content - Campaign Story */}
        <div className="flex-1">
          <CampaignStory content={story} media={media} />
        </div>

        {/* Sidebar - Donation/Pledge Options and Organizer Info */}
        <div className="w-full lg:w-auto">
          <CampaignSidebar
            campaignTitle={title}
            currentAmount={currentAmount}
            goalAmount={goalAmount}
            backerCount={backerCount}
            daysLeft={daysLeft}
            organizerName={organizerName}
            organizerAvatar={organizerAvatar}
            organizerLocation={organizerLocation}
            campaignCreatedDate={campaignCreatedDate}
            onDonateClick={onDonateClick}
            onPledgeClick={onPledgeClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
