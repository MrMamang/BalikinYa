import { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { styles } from "../../constants/styles";
import { Pinjaman } from "../../types/pinjaman";
import { getPinjamanById } from "../../services/pinjamanService";

export default function DetailPinjaman() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<Pinjaman | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getPinjamanById(id)
      .then((result) => setItem(result))
      .catch((e: Error) => setError(e.message));
  }, [id]);

  // canGoBack: kalau tidak ada riwayat, fallback ke home
  const kembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  if (!item) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{item.barang}</Text>
      <Text style={styles.info}>Peminjam: {item.peminjam}</Text>
      <Text style={styles.info}>Dipinjam: {item.tanggalPinjam}</Text>
      <Text style={styles.info}>Batas kembali: {item.batasKembali}</Text>
      <Text style={styles.info}>Status: {item.status}</Text>
      {item.catatan && <Text style={styles.info}>Catatan: {item.catatan}</Text>}

      <Pressable style={styles.button} onPress={kembali}>
        <Text style={styles.buttonText}>Kembali</Text>
      </Pressable>
    </View>
  );
}
