import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CampaignCRUD = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supabaseAvailable, setSupabaseAvailable] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    category: "Education",
    target_amount: 1000,
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    organizer_name: "Test Organizer",
    is_public: true,
    status: "active",
  });

  useEffect(() => {
    // Check if Supabase is properly configured
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase
          .from("campaigns")
          .select("id")
          .limit(1);
        // If we get here without an error, Supabase is available
        setSupabaseAvailable(true);
        fetchCampaigns();
      } catch (error) {
        console.error("Supabase connection error:", error);
        setSupabaseAvailable(false);
        setLoading(false);
      }
    };

    checkSupabaseConnection();
  }, []);

  async function fetchCampaigns() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

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

  async function createCampaign() {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .insert([
          {
            ...formData,
            story: formData.short_description,
            current_amount: 0,
            user_id: "00000000-0000-0000-0000-000000000000", // Placeholder user ID
          },
        ])
        .select();

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
    }
  }

  async function deleteCampaign(id) {
    try {
      const { error } = await supabase.from("campaigns").delete().eq("id", id);

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
    }
  }

  async function updateCampaign(id, newStatus) {
    try {
      const { error } = await supabase
        .from("campaigns")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Campaign status updated to ${newStatus}!`,
      });

      fetchCampaigns();
    } catch (error) {
      console.error("Error updating campaign:", error.message);
      toast({
        title: "Error",
        description: `Failed to update campaign: ${error.message}`,
        variant: "destructive",
      });
    }
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function resetForm() {
    setFormData({
      title: "",
      short_description: "",
      category: "Education",
      target_amount: 1000,
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      organizer_name: "Test Organizer",
      is_public: true,
      status: "active",
    });
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-6">Campaign CRUD Operations</h1>

      {!supabaseAvailable && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Supabase Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to Supabase. Please check your environment
            variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY). The CRUD
            operations will not work without a proper Supabase connection.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                createCampaign();
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
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
                  Description
                </label>
                <Textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  placeholder="Short description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Environment">Environment</option>
                  <option value="Community">Community</option>
                  <option value="Business">Business</option>
                </select>
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_public"
                  name="is_public"
                  checked={formData.is_public}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="is_public">Make campaign public</label>
              </div>

              <div className="flex items-center">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Reset
                </Button>
                <Button type="submit">Create Campaign</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading campaigns...</div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-4">No campaigns found</div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{campaign.title}</h3>
                        <p className="text-sm text-gray-600">
                          {campaign.short_description}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          <p>Category: {campaign.category}</p>
                          <p>Target: ${campaign.target_amount}</p>
                          <p>Status: {campaign.status}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateCampaign(
                                campaign.id,
                                campaign.status === "active"
                                  ? "draft"
                                  : "active",
                              )
                            }
                          >
                            {campaign.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteCampaign(campaign.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignCRUD;
