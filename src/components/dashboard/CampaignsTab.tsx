import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import {
  MoreHorizontal,
  Edit,
  BarChart2,
  ExternalLink,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  status: "active" | "completed" | "draft";
  createdAt: string;
  imageUrl: string;
  backers: number;
}

interface CampaignsTabProps {
  campaigns?: Campaign[];
}

const CampaignsTab = ({ campaigns = defaultCampaigns }: CampaignsTabProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Campaigns</h2>
        <Button onClick={() => (window.location.href = "/campaigns/create")}>
          Create New Campaign
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {campaigns
            .filter((campaign) => campaign.status === "active")
            .map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {campaigns
            .filter((campaign) => campaign.status === "completed")
            .map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {campaigns
            .filter((campaign) => campaign.status === "draft")
            .map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const progressPercentage = Math.min(
    Math.round((campaign.currentAmount / campaign.goalAmount) * 100),
    100,
  );

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 h-48 md:h-auto">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{campaign.title}</CardTitle>
                <CardDescription className="mt-2">
                  {campaign.description}
                </CardDescription>
              </div>
              <StatusBadge status={campaign.status} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    ${campaign.currentAmount.toLocaleString()} raised of $
                    {campaign.goalAmount.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium">
                    {progressPercentage}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{campaign.backers} backers</span>
                <span className="mx-2">•</span>
                <span>
                  Created on {new Date(campaign.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  (window.location.href = `/campaigns/${campaign.id}`)
                }
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <BarChart2 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Campaign
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {campaign.status === "active"
                    ? "Pause Campaign"
                    : "Activate Campaign"}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Campaign
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

interface StatusBadgeProps {
  status: "active" | "completed" | "draft";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variants = {
    active: { variant: "default", label: "Active" },
    completed: { variant: "secondary", label: "Completed" },
    draft: { variant: "outline", label: "Draft" },
  };

  const { variant, label } = variants[status];

  return <Badge variant={variant as any}>{label}</Badge>;
};

// Default mock data
const defaultCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Community Garden Project",
    description:
      "Help us build a sustainable community garden in the heart of downtown.",
    goalAmount: 5000,
    currentAmount: 3750,
    status: "active",
    createdAt: "2023-05-15T10:30:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    backers: 42,
  },
  {
    id: "2",
    title: "Local Animal Shelter Renovation",
    description:
      "Renovating our facilities to help more animals find their forever homes.",
    goalAmount: 10000,
    currentAmount: 10000,
    status: "completed",
    createdAt: "2023-02-10T14:20:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80",
    backers: 137,
  },
  {
    id: "3",
    title: "Tech Education for Underserved Youth",
    description:
      "Providing coding classes and computer equipment to underserved communities.",
    goalAmount: 7500,
    currentAmount: 0,
    status: "draft",
    createdAt: "2023-06-01T09:15:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    backers: 0,
  },
  {
    id: "4",
    title: "Neighborhood Cleanup Initiative",
    description:
      "Organizing monthly cleanup events to beautify our local neighborhoods.",
    goalAmount: 2000,
    currentAmount: 1200,
    status: "active",
    createdAt: "2023-04-22T11:45:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    backers: 28,
  },
];

export default CampaignsTab;
