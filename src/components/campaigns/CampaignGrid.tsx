import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import CampaignCard from "./CampaignCard";
import FilterBar from "./FilterBar";
import {
  getCampaigns,
  searchCampaigns,
  getCampaignsByCategory,
} from "@/lib/api/campaigns";
import { getPublicUrl } from "@/lib/api/storage";
import { differenceInDays } from "date-fns";
import { supabase } from "@/lib/supabase";

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
  campaigns: initialCampaigns,
  isLoading: initialLoading = false,
  error: initialError = "",
  onDonate = (id) => console.log(`Donate to campaign ${id}`),
  onPledge = (id) => console.log(`Pledge to campaign ${id}`),
}: CampaignGridProps) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(
    initialCampaigns || [],
  );
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState(initialError);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch campaigns from the database
  useEffect(() => {
    const fetchCampaigns = async () => {
      if (initialCampaigns) {
        setCampaigns(initialCampaigns);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        let result;

        // Handle different filter scenarios
        if (searchTerm) {
          result = await searchCampaigns(searchTerm);
        } else if (
          activeCategories.length > 0 &&
          !activeCategories.includes("all")
        ) {
          // If multiple categories are selected, we need to fetch each one
          if (activeCategories.length === 1) {
            result = await getCampaignsByCategory(activeCategories[0]);
          } else {
            // For multiple categories, we'll fetch all and filter client-side
            result = await getCampaigns();
          }
        } else {
          result = await getCampaigns();
        }

        if (result.error) {
          throw new Error(result.error.message);
        }

        // Transform the data to match our component's expected format
        if (result.data) {
          const formattedCampaigns = result.data.map((campaign) => {
            // Find the cover image for this campaign
            const coverMedia =
              campaign.media?.find((m: any) => m.is_cover) ||
              campaign.media?.[0];

            // Calculate days left
            const endDate = new Date(campaign.end_date);
            const today = new Date();
            const daysLeft = Math.max(0, differenceInDays(endDate, today));

            // Format the campaign data
            return {
              id: campaign.id,
              title: campaign.title,
              description: campaign.short_description,
              imageUrl: coverMedia
                ? getPublicUrl(coverMedia.file_path)
                : "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
              currentAmount: campaign.current_amount,
              goalAmount: campaign.target_amount,
              daysLeft: daysLeft,
              organizer: campaign.organizer_name,
              category: campaign.category,
            };
          });

          setCampaigns(formattedCampaigns);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load campaigns");
        console.error("Error fetching campaigns:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [initialCampaigns, searchTerm, activeCategories.join(",")]);

  useEffect(() => {
    // Apply filters and sorting whenever dependencies change
    let result = [...campaigns];

    // Apply category filter if not already filtered at the database level
    if (
      activeCategories.length > 0 &&
      !activeCategories.includes("all") &&
      activeCategories.length > 1
    ) {
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
      default:
        break;
    }

    setFilteredCampaigns(result);
  }, [campaigns, sortBy, activeCategories]);

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

export default CampaignGrid;
