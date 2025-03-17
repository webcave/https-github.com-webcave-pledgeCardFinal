import { supabase } from "@/lib/supabase";

// Sign up a new user
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

// Sign in a user
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

// Sign out a user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Get the current user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user || null, error };
}

// Get the current session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session || null, error };
}
