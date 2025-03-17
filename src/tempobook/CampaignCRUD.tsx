import React from "react";
import CampaignDetail from "../components/campaigns/CampaignDetail";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const CampaignCRUD: React.FC = () => {
  return (
    <div className="p-6 bg-white">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button variant="default">Create Campaign</Button>
            <Button variant="outline">View All Campaigns</Button>
            <Button variant="secondary">Edit Campaign</Button>
            <Button variant="destructive">Delete Campaign</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Campaign Preview</h2>
        <CampaignDetail />
      </div>
    </div>
  );
};

export default CampaignCRUD;
