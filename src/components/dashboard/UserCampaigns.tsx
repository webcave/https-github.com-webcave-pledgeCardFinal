import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCampaigns } from "@/lib/api/campaigns";
import { useAuth } from "@/contexts/DummyAuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Edit, Eye, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";
import { Progress } from "@/components/ui/progress";

const UserCampaigns = () => {
  const navigate = useNavigate();
  // Helper function to get image based on campaign category
  function getCampaignImageByCategory(category: string): string {
    const categoryImages = {
      Education:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=75",
      Health:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=75",
      Environment:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=75",
      Community:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=75",
      Business:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=75",
      Technology:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=75",
      Arts: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=75",
    };

    return (
      categoryImages[category] ||
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&q=75"
    );
  }

  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await getUserCampaigns(user.id);
        if (error) throw new Error(error.message);
        setCampaigns(data || []);
      } catch (err) {
        console.error("Error fetching user campaigns:", err);
        setError(err.message);
        toast({
          title: "Error",
          description: `Failed to load your campaigns: ${err.message}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [user]);

  const handleCreateCampaign = () => {
    navigate("/campaigns/create");
  };

  const handleEditCampaign = (id) => {
    navigate(`/campaigns/${id}/edit`);
  };

  const handleViewCampaign = (id) => {
    navigate(`/campaigns/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">
            Loading your campaigns...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
        <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
        <h3 className="text-lg font-medium">You need to be logged in</h3>
        <p className="text-muted-foreground mt-2">
          Please sign in to view your campaigns
        </p>
        <Button
          className="mt-4"
          onClick={() => navigate("/login?redirect=/dashboard/campaigns")}
        >
          Sign In
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-medium">Error loading campaigns</h3>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Campaigns</h2>
        <Button onClick={handleCreateCampaign}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      {campaigns.length === 0 ? (
        <Card className="bg-muted/40">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <PlusCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No campaigns yet</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              You haven't created any campaigns yet. Start your first
              fundraising campaign to make a difference.
            </p>
            <Button onClick={handleCreateCampaign}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {campaigns.map((campaign) => {
            // Calculate days left
            const endDate = new Date(campaign.end_date);
            const today = new Date();
            const daysLeft = Math.max(0, differenceInDays(endDate, today));

            // Calculate progress percentage
            const progressPercentage = Math.min(
              Math.round(
                (campaign.current_amount / campaign.target_amount) * 100,
              ),
              100,
            );

            // Determine status badge color
            let statusColor = "bg-green-100 text-green-800";
            if (campaign.status === "draft") {
              statusColor = "bg-gray-100 text-gray-800";
            } else if (campaign.status === "ended") {
              statusColor = "bg-red-100 text-red-800";
            } else if (campaign.status === "paused") {
              statusColor = "bg-amber-100 text-amber-800";
            }

            return (
              <Card key={campaign.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div
                    className="w-full md:w-48 h-48 md:h-auto bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${getCampaignImageByCategory(campaign.category)})`,
                    }}
                  ></div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold line-clamp-1">
                        {campaign.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusColor} capitalize`}
                      >
                        {campaign.status}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {campaign.short_description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">
                          UGX {campaign.current_amount.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          of UGX {campaign.target_amount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-primary">
                          {progressPercentage}% Funded
                        </span>
                        <span className="text-muted-foreground">
                          {daysLeft} days left
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                      <span>
                        Created:{" "}
                        {format(new Date(campaign.created_at), "MMM d, yyyy")}
                      </span>
                      <span>•</span>
                      <span>Category: {campaign.category}</span>
                      <span>•</span>
                      <span>{campaign.backer_count} backers</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewCampaign(campaign.id)}
                      >
                        <Eye className="mr-1 h-4 w-4" /> View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditCampaign(campaign.id)}
                      >
                        <Edit className="mr-1 h-4 w-4" /> Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserCampaigns;
