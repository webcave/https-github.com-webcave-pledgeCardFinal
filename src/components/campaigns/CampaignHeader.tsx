import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Share2, Heart, Calendar } from "lucide-react";

interface CampaignHeaderProps {
  title?: string;
  image?: string;
  currentAmount?: number;
  goalAmount?: number;
  daysLeft?: number;
  backerCount?: number;
  category?: string;
}

const CampaignHeader = ({
  title = "Help Fund Our Community Garden Project",
  image = "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&q=80",
  currentAmount = 8750,
  goalAmount = 15000,
  daysLeft = 21,
  backerCount = 143,
  category = "Community",
}: CampaignHeaderProps) => {
  const progressPercentage = Math.min(
    Math.round((currentAmount / goalAmount) * 100),
    100,
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 md:h-80 lg:h-96 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm"
          >
            <Heart className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="inline-block bg-primary/90 text-white text-xs px-2 py-1 rounded-full mb-2">
            {category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-bold">
              ${currentAmount.toLocaleString()}
            </span>
            <span className="text-gray-600">
              of ${goalAmount.toLocaleString()} goal
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{progressPercentage}% funded</span>
            <span>{backerCount} backers</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{daysLeft} days left</span>
          </div>
          <div className="flex space-x-3">
            <Button size="lg" className="font-semibold">
              Donate Now
            </Button>
            <Button variant="outline" size="lg" className="font-semibold">
              Pledge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;
