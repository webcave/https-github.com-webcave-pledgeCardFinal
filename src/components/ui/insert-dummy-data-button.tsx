import React, { useState } from "react";
import { Button } from "./button";
import { insertDummyCampaigns } from "@/lib/api/insertDummyCampaigns";
import { toast } from "./use-toast";

interface InsertDummyDataButtonProps {
  onSuccess?: () => void;
}

const InsertDummyDataButton = ({ onSuccess }: InsertDummyDataButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInsertDummyData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await insertDummyCampaigns();

      if (error) {
        toast({
          title: "Error",
          description: `Failed to insert dummy campaigns: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: data.message || "Dummy campaigns inserted successfully!",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleInsertDummyData}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      {isLoading ? "Inserting..." : "Insert Dummy Campaigns"}
    </Button>
  );
};

export default InsertDummyDataButton;
