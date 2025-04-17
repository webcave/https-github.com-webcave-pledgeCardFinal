import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  Loader2,
  RefreshCw,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, differenceInDays } from "date-fns";
import { isUsingFallbackStorage } from "@/lib/fallbackStorage";
import {
  getCampaigns,
  createCampaign,
  updateCampaign as updateCampaignApi,
  deleteCampaign as deleteCampaignApi,
} from "@/lib/api/campaigns";

const CampaignCRUD = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({
    connected: true,
    checking: true,
    usingFallback: false,
  });
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    story: "",
    category: "Education",
    target_amount: 1000,
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    organizer_name: "Test Organizer",
    organizer_bio: "",
    is_public: true,
    status: "active",
  });

  useEffect(() => {
    // Check if Supabase is properly configured
    const checkConnection = async () => {
      setConnectionStatus((prev) => ({ ...prev, checking: true }));
      try {
        const { data, error } = await supabase
          .from("campaigns")
          .select("id")
          .limit(1);

        const usingFallback = isUsingFallbackStorage();
        setConnectionStatus({
          connected: !error,
          checking: false,
          usingFallback,
        });

        fetchCampaigns();
      } catch (error) {
        console.error("Database connection error:", error);
        setConnectionStatus({
          connected: false,
          checking: false,
          usingFallback: true,
        });
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  async function fetchCampaigns() {
    try {
      setLoading(true);
      const { data, error } = await getCampaigns();

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error("Error fetching campaigns:", error.message);
      toast({
        title: "Error",
        description: `Failed to fetch campaigns: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCampaign() {
    try {
      setSubmitting(true);

      // Validate form data
      if (!formData.title || !formData.short_description) {
        throw new Error("Title and description are required");
      }

      // Prepare campaign data
      const campaignData = {
        ...formData,
        // If story is empty, use short_description
        story: formData.story || formData.short_description,
        current_amount: 0,
        backer_count: 0,
        user_id: "00000000-0000-0000-0000-000000000000", // Placeholder user ID
        target_amount: Number(formData.target_amount),
      };

      const { data, error } = await createCampaign(campaignData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign created successfully!",
      });

      fetchCampaigns();
      resetForm();
    } catch (error) {
      console.error("Error creating campaign:", error.message);
      toast({
        title: "Error",
        description: `Failed to create campaign: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteCampaign(id) {
    if (!confirm("Are you sure you want to delete this campaign?")) return;

    try {
      setLoading(true);
      const { error } = await deleteCampaignApi(id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign deleted successfully!",
      });

      fetchCampaigns();
    } catch (error) {
      console.error("Error deleting campaign:", error.message);
      toast({
        title: "Error",
        description: `Failed to delete campaign: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateCampaign(id, updates) {
    try {
      setLoading(true);
      const { error } = await updateCampaignApi(id, updates);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Campaign updated successfully!`,
      });

      fetchCampaigns();
    } catch (error) {
      console.error("Error updating campaign:", error.message);
      toast({
        title: "Error",
        description: `Failed to update campaign: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSelectChange(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function resetForm() {
    setFormData({
      title: "",
      short_description: "",
      story: "",
      category: "Education",
      target_amount: 1000,
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      organizer_name: "Test Organizer",
      organizer_bio: "",
      is_public: true,
      status: "active",
    });
  }

  // Calculate days left for a campaign
  const getDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    return Math.max(0, differenceInDays(end, today));
  };

  // Calculate progress percentage
  const getProgressPercentage = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaign Management</h1>

        <div className="flex items-center gap-2">
          {connectionStatus.checking ? (
            <Badge variant="outline" className="flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Checking connection...
            </Badge>
          ) : connectionStatus.connected ? (
            <Badge className="bg-green-500">Connected to Database</Badge>
          ) : (
            <Badge variant="destructive">Offline Mode</Badge>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={fetchCampaigns}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {connectionStatus.usingFallback && (
        <Alert variant="warning" className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">
            Using Fallback Storage
          </AlertTitle>
          <AlertDescription className="text-amber-700">
            You're currently working in offline mode. Changes will be saved
            locally and synchronized when database connection is restored.
          </AlertDescription>
        </Alert>
      )}

      {!connectionStatus.connected && !connectionStatus.usingFallback && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Database Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to the database. Please check your environment
            variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Campaign List</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title
                      </label>
                      <Input
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Campaign Title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Short Description
                      </label>
                      <Textarea
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleInputChange}
                        placeholder="Brief description (displayed in listings)"
                        required
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Story
                      </label>
                      <Textarea
                        name="story"
                        value={formData.story}
                        onChange={handleInputChange}
                        placeholder="Detailed campaign story (optional)"
                        rows={5}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Category
                      </label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleSelectChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Environment">
                            Environment
                          </SelectItem>
                          <SelectItem value="Community">Community</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Arts">Arts & Culture</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Target Amount
                      </label>
                      <Input
                        type="number"
                        name="target_amount"
                        value={formData.target_amount}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        End Date
                      </label>
                      <Input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Organizer Name
                      </label>
                      <Input
                        name="organizer_name"
                        value={formData.organizer_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Organizer Bio
                      </label>
                      <Textarea
                        name="organizer_bio"
                        value={formData.organizer_bio}
                        onChange={handleInputChange}
                        placeholder="About the organizer (optional)"
                        rows={2}
                      />
                    </div>

                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="is_public"
                          checked={formData.is_public}
                          onCheckedChange={(checked) =>
                            handleSelectChange("is_public", checked)
                          }
                        />
                        <label
                          htmlFor="is_public"
                          className="text-sm font-medium"
                        >
                          Make campaign public
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Status
                        </label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) =>
                            handleSelectChange("status", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={submitting}
              >
                Reset
              </Button>
              <Button
                type="button"
                onClick={handleCreateCampaign}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Campaign
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Campaign List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">
                      Loading campaigns...
                    </p>
                  </div>
                </div>
              ) : campaigns.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-muted p-3 mb-3">
                      <PlusCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No campaigns found</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
                      Create your first campaign to get started
                    </p>
                    <Button
                      onClick={() =>
                        document.querySelector('[data-value="create"]').click()
                      }
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Campaign
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((campaign) => {
                    const daysLeft = getDaysLeft(campaign.end_date);
                    const progressPercentage = getProgressPercentage(
                      campaign.current_amount,
                      campaign.target_amount,
                    );

                    return (
                      <Card key={campaign.id} className="overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold">
                                  {campaign.title}
                                </h3>
                                {getStatusBadge(campaign.status)}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {campaign.short_description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">
                                ${campaign.current_amount.toLocaleString()}
                              </span>
                              <span className="text-muted-foreground">
                                of ${campaign.target_amount.toLocaleString()}
                              </span>
                            </div>
                            <Progress
                              value={progressPercentage}
                              className="h-2"
                            />
                            <div className="flex justify-between text-xs">
                              <span className="text-primary">
                                {progressPercentage}% Funded
                              </span>
                              <span className="text-muted-foreground">
                                {daysLeft} days left
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span>Category: {campaign.category}</span>
                            <span>•</span>
                            <span>
                              Created:{" "}
                              {format(
                                new Date(campaign.created_at),
                                "MMM d, yyyy",
                              )}
                            </span>
                            <span>•</span>
                            <span>By: {campaign.organizer_name}</span>
                          </div>

                          <div className="mt-4 flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateCampaign(campaign.id, {
                                  status:
                                    campaign.status === "active"
                                      ? "draft"
                                      : "active",
                                })
                              }
                            >
                              {campaign.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600"
                            >
                              <Eye className="mr-1 h-4 w-4" /> View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-amber-600"
                            >
                              <Edit className="mr-1 h-4 w-4" /> Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              onClick={() => deleteCampaign(campaign.id)}
                            >
                              <Trash2 className="mr-1 h-4 w-4" /> Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignCRUD;
