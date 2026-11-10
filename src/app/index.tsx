import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { styles } from "../constants/styles";
import { Pinjaman, StatusPinjam } from "../types/pinjaman";

// ARRAY OF OBJECTS bertipe Pinjaman[]
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

const daftarStatus: StatusPinjam[] = ["dipinjam", "kembali", "telat"];

// CUSTOM FUNCTION 1: menentukan warna sesuai status
const warnaStatus = (status: StatusPinjam): string => {
  if (status === "kembali") {
    return "#16a34a"; // hijau
  } else if (status === "telat") {
    return "#dc2626"; // merah
  } else {
    return "#f59e0b"; // kuning
  }
};

// CUSTOM FUNCTION 2: membuat satu kartu pinjaman dari data
const renderPinjamanCard = (item: Pinjaman) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.barang}>{item.barang}</Text>

        {/* INLINE STYLING: warna badge tergantung status (dinamis) */}
        <View
          style={{
            backgroundColor: warnaStatus(item.status),
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.info}>Peminjam: {item.peminjam}</Text>
      <Text style={styles.info}>Dipinjam: {item.tanggalPinjam}</Text>
      <Text style={styles.info}>Batas kembali: {item.batasKembali}</Text>
      {item.catatan && <Text style={styles.info}>Catatan: {item.catatan}</Text>}

      <Pressable
        style={styles.button}
        onPress={() =>
          Alert.alert(item.barang, `Dipinjam oleh ${item.peminjam}`)
        }
      >
        <Text style={styles.buttonText}>Lihat Detail</Text>
      </Pressable>
    </View>
  );
};

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BalikinYa</Text>
      <Text style={styles.subtitle}>Catat barangmu yang dipinjam teman</Text>

      {/* LOOP 1: map() untuk ringkasan status */}
      <View style={styles.summaryRow}>
        {daftarStatus.map((status) => (
          <View key={status} style={styles.summaryBox}>
            <Text
              style={[styles.summaryNumber, { color: warnaStatus(status) }]}
            >
              {dataPinjaman.filter((p) => p.status === status).length}
            </Text>
            <Text style={styles.summaryLabel}>{status}</Text>
          </View>
        ))}
      </View>

      {/* LOOP 2: FlatList untuk daftar pinjaman */}
      <FlatList
        data={dataPinjaman}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderPinjamanCard(item)}
      />
    </View>
  );
}