import { supabase } from "@/lib/supabase";

// Upload a file to Supabase Storage
export async function uploadFile(
  path: string,
  file: File,
): Promise<{ data: any; error: Error | null }> {
  const { data, error } = await supabase.storage
    .from("media")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return { data, error };
}

// Get a public URL for a file
export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

// Delete a file from storage
export async function deleteFile(
  path: string,
): Promise<{ error: Error | null }> {
  const { error } = await supabase.storage.from("media").remove([path]);
  return { error };
}
