import React from "react";
import { Heart, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CampaignCardProps {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  currentAmount?: number;
  goalAmount?: number;
  daysLeft?: number;
  organizer?: string;
  category?: string;
  onDonate?: () => void;
  onPledge?: () => void;
}

const CampaignCard = ({
  id = "1",
  title = "Help Build a Community Garden",
  description = "We're raising funds to transform an empty lot into a beautiful community garden that will provide fresh produce and a gathering space for our neighborhood.",
  imageUrl = "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
  currentAmount = 4250,
  goalAmount = 10000,
  daysLeft = 23,
  organizer = "Sarah Johnson",
  category = "Community",
  onDonate = () => console.log("Donate clicked"),
  onPledge = () => console.log("Pledge clicked"),
}: CampaignCardProps) => {
  const progressPercentage = Math.min(
    Math.round((currentAmount / goalAmount) * 100),
    100,
  );

  return (
    <Card className="w-full max-w-[380px] overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-700 hover:text-red-500"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-full">
          {category}
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Organized by {organizer}
        </p>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              ${currentAmount.toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              of ${goalAmount.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs">
            <span className="font-medium text-primary">
              {progressPercentage}% Funded
            </span>
            <span className="text-muted-foreground">{daysLeft} days left</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Button className="flex-1" onClick={onDonate}>
          Donate Now
        </Button>
        <Button variant="outline" className="flex-1" onClick={onPledge}>
          Pledge
        </Button>
        <Button variant="ghost" size="icon" className="ml-auto">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
