import React, { useState } from "react";
import { Share2, Heart, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DonationForm from "../donations/DonationForm";
import PledgeForm from "../pledges/PledgeForm";

interface CampaignSidebarProps {
  campaignTitle?: string;
  currentAmount?: number;
  goalAmount?: number;
  backerCount?: number;
  daysLeft?: number;
  organizerName?: string;
  organizerAvatar?: string;
  organizerLocation?: string;
  campaignCreatedDate?: string;
  onDonateClick?: () => void;
  onPledgeClick?: () => void;
}

const CampaignSidebar = ({
  campaignTitle = "Help Fund Our Community Garden",
  currentAmount = 8750,
  goalAmount = 15000,
  backerCount = 142,
  daysLeft = 18,
  organizerName = "Sarah Johnson",
  organizerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  organizerLocation = "Portland, OR",
  campaignCreatedDate = "March 15, 2023",
  onDonateClick = () => {},
  onPledgeClick = () => {},
}: CampaignSidebarProps) => {
  const [isDonateDialogOpen, setIsDonateDialogOpen] = useState(false);
  const [isPledgeDialogOpen, setIsPledgeDialogOpen] = useState(false);
  const progressPercentage = Math.min(
    Math.round((currentAmount / goalAmount) * 100),
    100,
  );

  const handleDonateClick = () => {
    if (onDonateClick) {
      onDonateClick();
    } else {
      setIsDonateDialogOpen(true);
    }
  };

  const handlePledgeClick = () => {
    if (onPledgeClick) {
      onPledgeClick();
    } else {
      setIsPledgeDialogOpen(true);
    }
  };

  return (
    <div className="w-full max-w-[350px] bg-white rounded-lg shadow-md p-5 flex flex-col gap-6">
      {/* Campaign Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">
            ${currentAmount.toLocaleString()}
          </h3>
          <p className="text-gray-500">
            raised of ${goalAmount.toLocaleString()} goal
          </p>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <span className="font-semibold">{backerCount}</span> backers
          </div>
          <div>
            <span className="font-semibold">{daysLeft}</span> days left
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full py-6 text-base" onClick={handleDonateClick}>
          Donate Now
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 text-base"
          onClick={handlePledgeClick}
        >
          Pledge for Later
        </Button>
        <div className="flex justify-center gap-2 mt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this campaign</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save this campaign</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Organizer Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Campaign Organizer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={organizerAvatar} alt={organizerName} />
              <AvatarFallback>{organizerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{organizerName}</p>
              <p className="text-sm text-gray-500">{organizerLocation}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Campaign created on {campaignCreatedDate}</span>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Protection Notice */}
      <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
        <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p>
          This campaign is protected by our Donor Protection Guarantee.
          <a href="#" className="text-blue-500 hover:underline ml-1">
            Learn more
          </a>
        </p>
      </div>

      {/* Donate Dialog */}
      <Dialog open={isDonateDialogOpen} onOpenChange={setIsDonateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DonationForm
            campaignId="123"
            campaignTitle={campaignTitle}
            onDonationComplete={() => setIsDonateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Pledge Dialog */}
      <Dialog open={isPledgeDialogOpen} onOpenChange={setIsPledgeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <PledgeForm
            campaignId="123"
            campaignTitle={campaignTitle}
            onSubmit={() => setIsPledgeDialogOpen(false)}
            onCancel={() => setIsPledgeDialogOpen(false)}
            isOpen={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignSidebar;
