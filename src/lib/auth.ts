import { supabase } from './supabase';

export async function checkUserExists(email: string) {
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  return !!data;
}

export async function createProfile(userId: string, email: string, role: string) {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      username: email.split('@')[0],
      email,
      role
    })
    .select()
    .single();

  if (error) throw error;
}