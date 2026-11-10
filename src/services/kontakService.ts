import { Kontak, KontakResponse } from "../types/pinjaman";

export async function getKontak(): Promise<Kontak[]> {
  const response = await fetch(
    "https://dummyjson.com/users?limit=8&select=firstName,lastName,phone",
  );
  if (!response.ok) throw new Error("Gagal mengambil data kontak");

  const result: KontakResponse = await response.json();
  return result.users;
}
