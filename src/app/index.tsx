import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../constants/styles";
import { Pinjaman, StatusPinjam } from "../types/pinjaman";
import { getPinjaman } from "../services/pinjamanService";

const daftarStatus: StatusPinjam[] = ["dipinjam", "kembali", "telat"];

const warnaStatus = (status: StatusPinjam): string => {
  if (status === "kembali") return "#16a34a";
  if (status === "telat") return "#dc2626";
  return "#f59e0b";
};

export default function Index() {
  const router = useRouter();
  const [dataPinjaman, setDataPinjaman] = useState<Pinjaman[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // useEffect dengan [] : jalan sekali saat render pertama
  useEffect(() => {
    getPinjaman()
      .then((result) => setDataPinjaman(result))
      .catch((err: string) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // ubah state -> UI otomatis re-render
  const tandaiKembali = (id: string) => {
    setDataPinjaman((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "kembali" as StatusPinjam } : p
      )
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BalikinYa</Text>
      <Text style={styles.subtitle}>Catat barangmu yang dipinjam teman</Text>

      <View style={styles.summaryRow}>
        {daftarStatus.map((status) => (
          <View key={status} style={styles.summaryBox}>
            <Text style={[styles.summaryNumber, { color: warnaStatus(status) }]}>
              {dataPinjaman.filter((p) => p.status === status).length}
            </Text>
            <Text style={styles.summaryLabel}>{status}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={[styles.button, { marginBottom: 12 }]}
        onPress={() => router.push("/kontak")}
      >
        <Text style={styles.buttonText}>Lihat Daftar Kontak</Text>
      </Pressable>

      <FlatList
        data={dataPinjaman}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.barang}>{item.barang}</Text>
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
            <Text style={styles.info}>Batas kembali: {item.batasKembali}</Text>

            <Pressable
              style={styles.button}
              onPress={() =>
                router.push({ pathname: "/detail/[id]", params: { id: item.id } })
              }
            >
              <Text style={styles.buttonText}>Lihat Detail</Text>
            </Pressable>

            {item.status !== "kembali" && (
              <Pressable
                style={[styles.button, { backgroundColor: "#16a34a" }]}
                onPress={() => tandaiKembali(item.id)}
              >
                <Text style={styles.buttonText}>Tandai Sudah Kembali</Text>
              </Pressable>
            )}
          </View>
        )}
      />
    </View>
  );
}
