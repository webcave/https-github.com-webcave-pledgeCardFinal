import React, { useState, useEffect } from "react";
import PageLayout from "../layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Home, DollarSign, Calendar } from "lucide-react";

import DonationsTab from "./DonationsTab";
import PledgesTab from "./PledgesTab";
import CampaignsTab from "./CampaignsTab";

interface UserDashboardProps {
  activeTab?: "overview" | "donations" | "pledges" | "campaigns";
  userData?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

const UserDashboard = ({
  activeTab = "overview",
  userData = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
}: UserDashboardProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Update current tab when activeTab prop changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Mock stats for the overview tab
  const stats = [
    { label: "Total Donated", value: "$1,250.00", icon: DollarSign },
    { label: "Active Pledges", value: "3", icon: Calendar },
    { label: "Active Campaigns", value: "2", icon: Home },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        {/* User Profile Header */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              <img
                src={
                  userData.avatarUrl ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                }
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-500">{userData.email}</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <TabsList className="w-full max-w-3xl mx-auto mb-8 grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="pledges">Pledges</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {stat.label}
                        </p>
                        <h3 className="text-3xl font-bold mt-1">
                          {stat.value}
                        </h3>
                      </div>
                      <div className="p-3 rounded-full bg-primary/10">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Recent Donations
                  </h3>
                  <div className="space-y-4">
                    {/* Simplified version of recent donations */}
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">
                          Help Build a Community Garden
                        </p>
                        <p className="text-sm text-gray-500">Oct 15, 2023</p>
                      </div>
                      <p className="font-bold">$75.00</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">
                          Support Local Animal Shelter
                        </p>
                        <p className="text-sm text-gray-500">Sep 28, 2023</p>
                      </div>
                      <p className="font-bold">$120.50</p>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    className="mt-4 px-0"
                    onClick={() => setCurrentTab("donations")}
                  >
                    View all donations
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Upcoming Pledges
                  </h3>
                  <div className="space-y-4">
                    {/* Simplified version of upcoming pledges */}
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">
                          Save the Local Animal Shelter
                        </p>
                        <p className="text-sm text-gray-500">
                          Due: June 15, 2023
                        </p>
                      </div>
                      <p className="font-bold">$50.00</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Disaster Relief Fund</p>
                        <p className="text-sm text-gray-500">
                          Due: June 20, 2023
                        </p>
                      </div>
                      <p className="font-bold">$75.00</p>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    className="mt-4 px-0"
                    onClick={() => setCurrentTab("pledges")}
                  >
                    View all pledges
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations">
            <DonationsTab />
          </TabsContent>

          {/* Pledges Tab */}
          <TabsContent value="pledges">
            <PledgesTab />
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <CampaignsTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default UserDashboard;
