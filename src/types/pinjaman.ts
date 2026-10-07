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