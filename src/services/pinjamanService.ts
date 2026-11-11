import { Pinjaman } from "../types/pinjaman";
import { delay } from "../utils/delay";

const dataPinjaman: Pinjaman[] = [
  {
    id: "1",
    barang: "Charger Laptop",
    peminjam: "Andi",
    tanggalPinjam: "01 Okt 2026",
    batasKembali: "05 Okt 2026",
    status: "telat",
    catatan: "Charger warna hitam",
  },
  {
    id: "2",
    barang: "Buku Algoritma",
    peminjam: "Budi",
    tanggalPinjam: "03 Okt 2026",
    batasKembali: "12 Okt 2026",
    status: "dipinjam",
  },
  {
    id: "3",
    barang: "Payung Biru",
    peminjam: "Citra",
    tanggalPinjam: "28 Sep 2026",
    batasKembali: "02 Okt 2026",
    status: "kembali",
  },
  {
    id: "4",
    barang: "Flashdisk 32GB",
    peminjam: "Dewi",
    tanggalPinjam: "05 Okt 2026",
    batasKembali: "15 Okt 2026",
    status: "dipinjam",
  },
];

// Promise manual: resolve kalau sukses, reject kalau gagal
export function getPinjaman(): Promise<Pinjaman[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dataPinjaman.length > 0) {
        resolve([...dataPinjaman]);
      } else {
        reject("Data pinjaman kosong");
      }
    }, 1000);
  });
}

// Async function custom (pakai await)
export async function getPinjamanById(id: string): Promise<Pinjaman> {
  await delay(500);
  const found = dataPinjaman.find((p) => p.id === id);
  if (!found) throw new Error("Pinjaman tidak ditemukan");
  return found;
}
