import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getUserCampaigns,
  deleteCampaign,
  updateCampaign,
} from "@/lib/api/campaigns";
import { getPublicUrl } from "@/lib/api/storage";
import { supabase } from "@/lib/supabase";
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
  const [userCampaigns, setUserCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserCampaigns = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const { data, error } = await getUserCampaigns(user.id);

        if (error) throw error;

        if (data) {
          // Transform the data to match our component's expected format
          const formattedCampaigns = await Promise.all(
            data.map(async (campaign) => {
              // Get the cover image for this campaign
              const { data: mediaData } = await supabase
                .from("campaign_media")
                .select("*")
                .eq("campaign_id", campaign.id)
                .eq("is_cover", true)
                .single();

              return {
                id: campaign.id,
                title: campaign.title,
                description: campaign.short_description,
                goalAmount: campaign.target_amount,
                currentAmount: campaign.current_amount,
                status: campaign.status,
                createdAt: campaign.created_at,
                imageUrl: mediaData
                  ? getPublicUrl(mediaData.file_path)
                  : "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
                backers: campaign.backer_count,
              };
            }),
          );

          setUserCampaigns(formattedCampaigns);
        }
      } catch (err) {
        console.error("Error fetching user campaigns:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCampaigns();
  }, [user]);

  // Use the fetched campaigns instead of the prop
  const displayCampaigns = userCampaigns.length > 0 ? userCampaigns : campaigns;
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
                  onClick={async () => {
                    try {
                      const newStatus =
                        campaign.status === "active" ? "draft" : "active";
                      await updateCampaign(campaign.id, { status: newStatus });
                      toast({
                        title: "Campaign updated",
                        description: `Campaign ${newStatus === "active" ? "activated" : "paused"} successfully`,
                      });
                      // Refresh the campaigns list
                      window.location.reload();
                    } catch (error: any) {
                      toast({
                        title: "Error",
                        description:
                          error.message || "Failed to update campaign",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {campaign.status === "active"
                    ? "Pause Campaign"
                    : "Activate Campaign"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={async () => {
                    if (
                      confirm(
                        "Are you sure you want to delete this campaign? This action cannot be undone.",
                      )
                    ) {
                      try {
                        await deleteCampaign(campaign.id);
                        toast({
                          title: "Campaign deleted",
                          description: "Campaign deleted successfully",
                        });
                        // Refresh the campaigns list
                        window.location.reload();
                      } catch (error: any) {
                        toast({
                          title: "Error",
                          description:
                            error.message || "Failed to delete campaign",
                          variant: "destructive",
                        });
                      }
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

// Fetch campaigns from the database in the component

export default CampaignsTab;
