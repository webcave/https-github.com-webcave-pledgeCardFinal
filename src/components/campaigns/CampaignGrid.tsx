import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import CampaignCard from "./CampaignCard";
import FilterBar from "./FilterBar";

interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentAmount: number;
  goalAmount: number;
  daysLeft: number;
  organizer: string;
  category: string;
}

interface CampaignGridProps {
  campaigns?: Campaign[];
  isLoading?: boolean;
  error?: string;
  onDonate?: (campaignId: string) => void;
  onPledge?: (campaignId: string) => void;
}

const CampaignGrid = ({
  campaigns = mockCampaigns,
  isLoading = false,
  error = "",
  onDonate = (id) => console.log(`Donate to campaign ${id}`),
  onPledge = (id) => console.log(`Pledge to campaign ${id}`),
}: CampaignGridProps) => {
  const [filteredCampaigns, setFilteredCampaigns] =
    useState<Campaign[]>(campaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Apply filters and sorting whenever dependencies change
    let result = [...campaigns];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (activeCategories.length > 0 && !activeCategories.includes("all")) {
      result = result.filter((campaign) =>
        activeCategories.includes(campaign.category),
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        // Assuming campaigns are already sorted by newest
        break;
      case "oldest":
        result = [...result].reverse();
        break;
      case "most-funded":
        result = [...result].sort((a, b) => b.currentAmount - a.currentAmount);
        break;
      case "closest-to-goal":
        result = [...result].sort(
          (a, b) =>
            b.currentAmount / b.goalAmount - a.currentAmount / a.goalAmount,
        );
        break;
      case "most-pledges":
        // This would require pledge count data, using a placeholder sort
        break;
      default:
        break;
    }

    setFilteredCampaigns(result);
  }, [campaigns, searchTerm, activeCategories, sortBy]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (categories: string) => {
    setActiveCategories(categories === "all" ? [] : categories.split(","));
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-gray-500">Loading campaigns...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 bg-gray-50">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error loading campaigns</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <FilterBar
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />

        {filteredCampaigns.length === 0 ? (
          <div className="mt-8 text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-700">
              No campaigns found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                title={campaign.title}
                description={campaign.description}
                imageUrl={campaign.imageUrl}
                currentAmount={campaign.currentAmount}
                goalAmount={campaign.goalAmount}
                daysLeft={campaign.daysLeft}
                organizer={campaign.organizer}
                category={campaign.category}
                onDonate={() => onDonate(campaign.id)}
                onPledge={() => onPledge(campaign.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Mock data for default display
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Help Build a Community Garden",
    description:
      "We're raising funds to transform an empty lot into a beautiful community garden that will provide fresh produce and a gathering space for our neighborhood.",
    imageUrl:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
    currentAmount: 4250,
    goalAmount: 10000,
    daysLeft: 23,
    organizer: "Sarah Johnson",
    category: "Community",
  },
  {
    id: "2",
    title: "Medical Treatment for Jamie",
    description:
      "Jamie needs urgent medical treatment for a rare condition. Your support will help cover the costs of specialized care not covered by insurance.",
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    currentAmount: 15750,
    goalAmount: 25000,
    daysLeft: 12,
    organizer: "Michael Chen",
    category: "Medical",
  },
  {
    id: "3",
    title: "Save Our Local Theater",
    description:
      "Our historic community theater is at risk of closing. Help us preserve this cultural landmark that has served our community for generations.",
    imageUrl:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
    currentAmount: 32600,
    goalAmount: 50000,
    daysLeft: 45,
    organizer: "Theater Preservation Society",
    category: "Creative",
  },
  {
    id: "4",
    title: "College Fund for First-Generation Students",
    description:
      "Help provide scholarships for talented first-generation college students from underserved communities to pursue their educational dreams.",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    currentAmount: 12800,
    goalAmount: 30000,
    daysLeft: 60,
    organizer: "Education First Foundation",
    category: "Education",
  },
  {
    id: "5",
    title: "Wildlife Rescue Center Expansion",
    description:
      "Our wildlife rescue center needs to expand to accommodate more animals. Your donation will help build new facilities and provide better care.",
    imageUrl:
      "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=800&q=80",
    currentAmount: 9500,
    goalAmount: 20000,
    daysLeft: 38,
    organizer: "Wildlife Protectors",
    category: "Animals",
  },
  {
    id: "6",
    title: "Hurricane Relief Fund",
    description:
      "Help families affected by the recent hurricane rebuild their homes and lives. Every donation makes a difference in this time of urgent need.",
    imageUrl:
      "https://images.unsplash.com/photo-1572724013789-f7ce435ff399?w=800&q=80",
    currentAmount: 45000,
    goalAmount: 100000,
    daysLeft: 15,
    organizer: "Disaster Relief Network",
    category: "Emergency",
  },
];

export default CampaignGrid;
