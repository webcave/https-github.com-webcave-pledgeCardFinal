import React, { useState } from "react";
import { useAuth } from "@/contexts/DummyAuthContext";
import { toast } from "@/components/ui/use-toast";
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

const CampaignsTab = ({ campaigns = [] }: CampaignsTabProps) => {
  // Define dummy campaigns directly
  const dummyCampaigns: Campaign[] = [
    {
      id: "1",
      title: "Help Build a School in Rural Uganda",
      description: "Support education for 500 children in need",
      goalAmount: 50000,
      currentAmount: 32500,
      status: "active",
      createdAt: "2023-09-15T10:30:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=800&q=80",
      backers: 125,
    },
    {
      id: "2",
      title: "Clean Water Initiative",
      description: "Bringing clean water to communities in Northern Uganda",
      goalAmount: 25000,
      currentAmount: 25000,
      status: "completed",
      createdAt: "2023-07-20T14:15:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80",
      backers: 210,
    },
    {
      id: "3",
      title: "Medical Supplies for Rural Clinic",
      description: "Help us stock essential medicines and equipment",
      goalAmount: 15000,
      currentAmount: 3200,
      status: "active",
      createdAt: "2023-10-05T09:45:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80",
      backers: 42,
    },
    {
      id: "4",
      title: "Community Garden Project",
      description: "Creating sustainable food sources for local families",
      goalAmount: 8000,
      currentAmount: 1200,
      status: "draft",
      createdAt: "2023-10-12T16:20:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
      backers: 15,
    },
    {
      id: "5",
      title: "Renewable Energy for Remote Village",
      description: "Installing solar panels to provide electricity to 50 homes",
      goalAmount: 35000,
      currentAmount: 12800,
      status: "active",
      createdAt: "2023-11-03T08:15:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      backers: 78,
    },
    {
      id: "6",
      title: "Women's Entrepreneurship Program",
      description:
        "Providing business training and microloans to women entrepreneurs",
      goalAmount: 20000,
      currentAmount: 20000,
      status: "completed",
      createdAt: "2023-08-17T11:45:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
      backers: 143,
    },
    {
      id: "7",
      title: "Emergency Food Relief",
      description:
        "Distributing food packages to families affected by recent floods",
      goalAmount: 12000,
      currentAmount: 11500,
      status: "active",
      createdAt: "2023-12-01T09:30:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      backers: 230,
    },
    {
      id: "8",
      title: "Mobile Library for Rural Schools",
      description:
        "Creating a mobile library to serve 10 schools in remote areas",
      goalAmount: 18000,
      currentAmount: 2300,
      status: "draft",
      createdAt: "2023-12-10T14:20:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
      backers: 28,
    },
    {
      id: "9",
      title: "Youth Sports Program",
      description:
        "Providing sports equipment and coaching for underprivileged youth",
      goalAmount: 10000,
      currentAmount: 4200,
      status: "active",
      createdAt: "2023-11-15T16:45:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80",
      backers: 67,
    },
    {
      id: "10",
      title: "Mental Health Support Center",
      description:
        "Establishing a community center for mental health services and support",
      goalAmount: 45000,
      currentAmount: 5800,
      status: "draft",
      createdAt: "2023-12-05T10:15:00Z",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      backers: 52,
    },
  ];

  const [userCampaigns, setUserCampaigns] =
    useState<Campaign[]>(dummyCampaigns);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Always use the dummy campaigns
  const displayCampaigns = userCampaigns;
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
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            displayCampaigns
              .filter((campaign) => campaign.status === "active")
              .map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
          )}
          {!isLoading &&
            displayCampaigns.filter((c) => c.status === "active").length ===
              0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No active campaigns found
                </p>
              </div>
            )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            displayCampaigns
              .filter((campaign) => campaign.status === "completed")
              .map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
          )}
          {!isLoading &&
            displayCampaigns.filter((c) => c.status === "completed").length ===
              0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No completed campaigns found
                </p>
              </div>
            )}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            displayCampaigns
              .filter((campaign) => campaign.status === "draft")
              .map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
          )}
          {!isLoading &&
            displayCampaigns.filter((c) => c.status === "draft").length ===
              0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No draft campaigns found
                </p>
              </div>
            )}
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
                <DropdownMenuItem
                  onClick={() =>
                    (window.location.href = `/campaigns/${campaign.id}/edit`)
                  }
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Campaign
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    // Use dummy data instead of API call
                    const newStatus =
                      campaign.status === "active" ? "draft" : "active";
                    toast({
                      title: "Campaign updated",
                      description: `Campaign ${newStatus === "active" ? "activated" : "paused"} successfully`,
                    });
                    // Update the campaign status
                    setUserCampaigns((prev) =>
                      prev.map((c) =>
                        c.id === campaign.id ? { ...c, status: newStatus } : c,
                      ),
                    );
                  }}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {campaign.status === "active"
                    ? "Pause Campaign"
                    : "Activate Campaign"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this campaign? This action cannot be undone.",
                      )
                    ) {
                      // Use dummy data instead of API call
                      toast({
                        title: "Campaign deleted",
                        description: "Campaign deleted successfully",
                      });
                      // Remove campaign from state
                      setUserCampaigns((prev) =>
                        prev.filter((c) => c.id !== campaign.id),
                      );
                    }
                  }}
                >
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

export default CampaignsTab;
