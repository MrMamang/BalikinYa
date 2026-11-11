import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { styles } from "../constants/styles";
import { Kontak } from "../types/pinjaman";
import { getKontak } from "../services/kontakService";

export default function KontakPage() {
  const [kontak, setKontak] = useState<Kontak[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getKontak();
        setKontak(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
    <View style={styles.page}>
      <FlatList
        data={kontak}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.barang}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.info}>{item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
}
