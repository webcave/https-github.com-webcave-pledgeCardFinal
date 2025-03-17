import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  AlertCircle,
  CreditCard,
  Calendar as CalendarIcon,
} from "lucide-react";

interface PledgeItem {
  id: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  pledgeDate: string;
  reminderDate: string;
  status: "pending" | "fulfilled" | "expired";
  note?: string;
}

interface PledgesTabProps {
  pledges?: PledgeItem[];
}

const PledgesTab = ({ pledges = defaultPledges }: PledgesTabProps) => {
  const [selectedPledge, setSelectedPledge] = useState<PledgeItem | null>(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleConvertToDonation = (pledge: PledgeItem) => {
    setSelectedPledge(pledge);
    // In a real implementation, this would navigate to the donation form
    // or open a donation dialog with pre-filled information
  };

  const handleCancelPledge = (pledge: PledgeItem) => {
    setSelectedPledge(pledge);
    setOpenCancelDialog(true);
  };

  const confirmCancelPledge = () => {
    // In a real implementation, this would call an API to cancel the pledge
    setOpenCancelDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "fulfilled":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" /> Fulfilled
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Expired
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full bg-background p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Your Pledges</h2>
        <p className="text-muted-foreground">
          Manage your pending pledges and convert them to donations when you're
          ready.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Pledges</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {pledges.length > 0 ? (
            pledges.map((pledge) => (
              <PledgeCard
                key={pledge.id}
                pledge={pledge}
                onConvert={handleConvertToDonation}
                onCancel={handleCancelPledge}
                getStatusBadge={getStatusBadge}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pledges.filter((p) => p.status === "pending").length > 0 ? (
            pledges
              .filter((p) => p.status === "pending")
              .map((pledge) => (
                <PledgeCard
                  key={pledge.id}
                  pledge={pledge}
                  onConvert={handleConvertToDonation}
                  onCancel={handleCancelPledge}
                  getStatusBadge={getStatusBadge}
                />
              ))
          ) : (
            <EmptyState message="You don't have any pending pledges." />
          )}
        </TabsContent>

        <TabsContent value="fulfilled" className="space-y-4">
          {pledges.filter((p) => p.status === "fulfilled").length > 0 ? (
            pledges
              .filter((p) => p.status === "fulfilled")
              .map((pledge) => (
                <PledgeCard
                  key={pledge.id}
                  pledge={pledge}
                  onConvert={handleConvertToDonation}
                  onCancel={handleCancelPledge}
                  getStatusBadge={getStatusBadge}
                  disableActions
                />
              ))
          ) : (
            <EmptyState message="You don't have any fulfilled pledges." />
          )}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {pledges.filter((p) => p.status === "expired").length > 0 ? (
            pledges
              .filter((p) => p.status === "expired")
              .map((pledge) => (
                <PledgeCard
                  key={pledge.id}
                  pledge={pledge}
                  onConvert={handleConvertToDonation}
                  onCancel={handleCancelPledge}
                  getStatusBadge={getStatusBadge}
                  disableActions
                />
              ))
          ) : (
            <EmptyState message="You don't have any expired pledges." />
          )}
        </TabsContent>
      </Tabs>

      {selectedPledge && (
        <Dialog
          open={!!selectedPledge && !openCancelDialog}
          onOpenChange={(open) => !open && setSelectedPledge(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convert Pledge to Donation</DialogTitle>
              <DialogDescription>
                You're about to convert your pledge of $
                {selectedPledge.amount.toFixed(2)} for{" "}
                {selectedPledge.campaignTitle} to an immediate donation.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Campaign:</span>
                  <span className="text-sm">
                    {selectedPledge.campaignTitle}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Amount:</span>
                  <span className="text-sm">
                    ${selectedPledge.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Pledge Date:</span>
                  <span className="text-sm">{selectedPledge.pledgeDate}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPledge(null)}>
                Cancel
              </Button>
              <Button
                onClick={() =>
                  (window.location.href = `/campaigns/${selectedPledge.campaignId}?donate=true`)
                }
              >
                Proceed to Donation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <AlertDialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently cancel your pledge of $
              {selectedPledge?.amount.toFixed(2)} to{" "}
              {selectedPledge?.campaignTitle}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Pledge</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelPledge}
              className="bg-destructive text-destructive-foreground"
            >
              Cancel Pledge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

interface PledgeCardProps {
  pledge: PledgeItem;
  onConvert: (pledge: PledgeItem) => void;
  onCancel: (pledge: PledgeItem) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  disableActions?: boolean;
}

const PledgeCard = ({
  pledge,
  onConvert,
  onCancel,
  getStatusBadge,
  disableActions = false,
}: PledgeCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{pledge.campaignTitle}</CardTitle>
            <CardDescription className="mt-1">
              Pledged on {pledge.pledgeDate}
            </CardDescription>
          </div>
          {getStatusBadge(pledge.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium">${pledge.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reminder Date:</span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              {pledge.reminderDate}
            </span>
          </div>
          {pledge.note && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-sm text-muted-foreground">
                Note: {pledge.note}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      {!disableActions && pledge.status === "pending" && (
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => onCancel(pledge)}>
            Cancel Pledge
          </Button>
          <Button size="sm" onClick={() => onConvert(pledge)}>
            Convert to Donation
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({
  message = "You don't have any pledges yet.",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/20">
      <div className="rounded-full bg-muted p-3 mb-4">
        <Calendar className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-1">{message}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        When you make a pledge to support a campaign, it will appear here for
        you to manage.
      </p>
    </div>
  );
};

// Mock data for default display
const defaultPledges: PledgeItem[] = [
  {
    id: "1",
    campaignId: "c1",
    campaignTitle: "Save the Local Animal Shelter",
    amount: 50,
    pledgeDate: "May 15, 2023",
    reminderDate: "June 15, 2023",
    status: "pending",
    note: "Will donate on payday",
  },
  {
    id: "2",
    campaignId: "c2",
    campaignTitle: "Community Garden Project",
    amount: 25,
    pledgeDate: "April 3, 2023",
    reminderDate: "May 3, 2023",
    status: "fulfilled",
  },
  {
    id: "3",
    campaignId: "c3",
    campaignTitle: "Local School Music Program",
    amount: 100,
    pledgeDate: "March 10, 2023",
    reminderDate: "April 10, 2023",
    status: "expired",
  },
  {
    id: "4",
    campaignId: "c4",
    campaignTitle: "Disaster Relief Fund",
    amount: 75,
    pledgeDate: "May 20, 2023",
    reminderDate: "June 20, 2023",
    status: "pending",
  },
];

export default PledgesTab;
