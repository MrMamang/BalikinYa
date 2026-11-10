// Union type: status hanya boleh salah satu dari 3 nilai ini
export type StatusPinjam = "dipinjam" | "kembali" | "telat";

// Interface: bentuk satu data pinjaman
export interface Pinjaman {
  readonly id: string; // tidak bisa diubah setelah dibuat
  barang: string;
  peminjam: string;
  tanggalPinjam: string;
  batasKembali: string;
  status: StatusPinjam;
  catatan?: string; // opsional
}

// Interface: bentuk satu kontak dari API
export interface Kontak {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

// Interface: bentuk response API (isinya array Kontak)
export interface KontakResponse {
  users: Kontak[];
  total: number;
}
