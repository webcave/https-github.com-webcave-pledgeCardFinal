import React, { useState, useEffect } from "react";
import { Wifi, WifiOff, Database, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { isUsingFallbackStorage } from "@/lib/fallbackStorage";
import { checkDatabaseConnection } from "@/lib/supabase";

interface ConnectionStatusProps {
  className?: string;
}

const ConnectionStatus = ({ className }: ConnectionStatusProps) => {
  const [status, setStatus] = useState<
    "connected" | "disconnected" | "checking"
  >("checking");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      setStatus("checking");
      const isConnected = await checkDatabaseConnection();
      setStatus(isConnected ? "connected" : "disconnected");
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const statusColors = {
    connected: "bg-green-500",
    disconnected: "bg-red-500",
    checking: "bg-yellow-500",
  };

  const statusIcons = {
    connected: <Wifi className="h-4 w-4 text-green-500" />,
    disconnected: <WifiOff className="h-4 w-4 text-red-500" />,
    checking: <Database className="h-4 w-4 text-yellow-500 animate-pulse" />,
  };

  const statusMessages = {
    connected: "Connected to database",
    disconnected: "Using offline mode",
    checking: "Checking connection...",
  };

  const usingFallback = isUsingFallbackStorage();

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium hover:bg-gray-100 transition-colors"
      >
        <span
          className={cn("h-2 w-2 rounded-full", statusColors[status])}
        ></span>
        {statusIcons[status]}
        <span className="hidden sm:inline">{statusMessages[status]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border p-4 z-10">
          <div className="flex items-center gap-2 mb-2">
            {statusIcons[status]}
            <span className="font-medium">{statusMessages[status]}</span>
          </div>

          {status === "disconnected" && (
            <div className="mt-2 text-sm">
              <div className="flex items-start gap-2 text-amber-600 mb-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Your changes will be saved locally and synced when connection
                  is restored.
                </p>
              </div>
              <button
                onClick={async () => {
                  setStatus("checking");
                  const isConnected = await checkDatabaseConnection();
                  setStatus(isConnected ? "connected" : "disconnected");
                }}
                className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 rounded-md text-xs font-medium transition-colors"
              >
                Try reconnecting
              </button>
            </div>
          )}

          {usingFallback && status === "connected" && (
            <div className="mt-2 text-sm text-amber-600 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                You have unsynchronized local data. Please refresh the page to
                sync.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;
