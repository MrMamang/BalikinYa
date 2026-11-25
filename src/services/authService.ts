import { supabase } from "../lib/supabase";

// Daftar: nama panggilan dikirim sebagai metadata
export async function daftar(
  email: string,
  password: string,
  nama: string
): Promise<void> {
  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { nama: nama.trim() } },
  });
  if (error) throw new Error(error.message);
}

export async function masuk(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) throw new Error(error.message);
}

// Keluar: batalkan sesi cloud dan hapus token dari perangkat
export async function keluar(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
