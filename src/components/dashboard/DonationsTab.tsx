import React from "react";
import { format } from "date-fns";
import { Download, ExternalLink, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Donation {
  id: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  date: Date;
  status: "completed" | "processing" | "failed";
  receiptUrl?: string;
}

interface DonationsTabProps {
  donations?: Donation[];
}

const DonationsTab = ({ donations = mockDonations }: DonationsTabProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Donations</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Donations</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <DonationsList donations={donations} />
        </TabsContent>

        <TabsContent value="completed">
          <DonationsList
            donations={donations.filter((d) => d.status === "completed")}
          />
        </TabsContent>

        <TabsContent value="processing">
          <DonationsList
            donations={donations.filter((d) => d.status === "processing")}
          />
        </TabsContent>

        <TabsContent value="failed">
          <DonationsList
            donations={donations.filter((d) => d.status === "failed")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface DonationsListProps {
  donations: Donation[];
}

const DonationsList = ({ donations }: DonationsListProps) => {
  if (donations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No donations found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {donations.map((donation) => (
        <DonationCard key={donation.id} donation={donation} />
      ))}
    </div>
  );
};

interface DonationCardProps {
  donation: Donation;
}

const DonationCard = ({ donation }: DonationCardProps) => {
  const statusColors = {
    completed: "default",
    processing: "secondary",
    failed: "destructive",
  } as const;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{donation.campaignTitle}</CardTitle>
            <CardDescription>
              Donated on {format(donation.date, "MMMM d, yyyy")}
            </CardDescription>
          </div>
          <Badge variant={statusColors[donation.status]}>
            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-2xl font-bold">${donation.amount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Transaction ID</p>
            <p className="text-sm font-mono">{donation.id.slice(0, 8)}...</p>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-4">
        <div className="flex w-full justify-end gap-2">
          {donation.receiptUrl && (
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Receipt
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              (window.location.href = `/campaigns/${donation.campaignId}`)
            }
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Campaign
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Mock data for default display
const mockDonations: Donation[] = [
  {
    id: "don_123456789",
    campaignId: "camp_1",
    campaignTitle: "Help Build a Community Garden",
    amount: 75.0,
    date: new Date("2023-10-15"),
    status: "completed",
    receiptUrl: "#",
  },
  {
    id: "don_987654321",
    campaignId: "camp_2",
    campaignTitle: "Support Local Animal Shelter",
    amount: 120.5,
    date: new Date("2023-09-28"),
    status: "completed",
    receiptUrl: "#",
  },
  {
    id: "don_456789123",
    campaignId: "camp_3",
    campaignTitle: "Emergency Flood Relief Fund",
    amount: 250.0,
    date: new Date(),
    status: "processing",
  },
  {
    id: "don_789123456",
    campaignId: "camp_4",
    campaignTitle: "School Supplies for Children in Need",
    amount: 45.0,
    date: new Date("2023-08-05"),
    status: "failed",
  },
];

export default DonationsTab;
