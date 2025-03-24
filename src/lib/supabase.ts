import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { setFallbackStorageMode } from "./fallbackStorage";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client or use actual credentials if available
let supabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase environment variables are missing. Using mock client.",
  );
  // Create a mock client with methods that return empty data
  supabaseClient = {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
      }),
      update: () => ({
        eq: () => ({
          select: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
      delete: () => ({
        eq: () => Promise.resolve({ error: null }),
      }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: {}, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
        remove: () => Promise.resolve({ error: null }),
      }),
    },
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () =>
        Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signUp: () => Promise.resolve({ data: {}, error: null }),
      signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
  };

  // Set fallback storage mode to true since we're using mock client
  setFallbackStorageMode(true);
} else {
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;

// Function to check if the database connection is working
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Try a simple query to check connection
    const { data, error } = await supabase
      .from("campaigns")
      .select("id")
      .limit(1);

    // If there's no error, connection is working
    const isConnected = !error;

    // Update fallback storage mode based on connection status
    setFallbackStorageMode(!isConnected);

    return isConnected;
  } catch (error) {
    console.error("Error checking database connection:", error);
    setFallbackStorageMode(true);
    return false;
  }
}

// Initialize database tables if they don't exist
export async function initializeDatabase(): Promise<boolean> {
  try {
    // Check if campaigns table exists by trying to query it
    const { error } = await supabase.from("campaigns").select("id").limit(1);

    // If there's an error, the table might not exist
    if (error) {
      console.warn(
        "Error accessing campaigns table, it might not exist:",
        error,
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
}

// Function to sync local data with the database
export async function syncLocalData(): Promise<void> {
  // This would be implemented to sync data from fallbackStorage to Supabase
  // when connection is restored
  console.log("Syncing local data with database...");
}
