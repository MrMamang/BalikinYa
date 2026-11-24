import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { styles } from "../../constants/styles";
import { daftar, masuk } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pesan, setPesan] = useState<string>("");

  const handleAuth = async () => {
    if (loading) return; // cegah submit ganda
    if (isRegistering && !nama.trim()) {
      setPesan("Nama panggilan wajib diisi");
      return;
    }
    if (!email.trim() || password.length < 6) {
      setPesan("Email wajib diisi dan password minimal 6 karakter");
      return;
    }
    setLoading(true);
    setPesan("");
    try {
      if (isRegistering) {
        await daftar(email, password, nama);
      } else {
        await masuk(email, password);
      }
      // Sukses: AuthContext mendeteksi sesi, route guard otomatis pindah ke home
    } catch (e) {
      setPesan(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.center}>
      <View style={{ width: "100%", maxWidth: 400 }}>
        <Text style={styles.title}>BalikinYa</Text>
        <Text style={styles.subtitle}>
          {isRegistering ? "Buat akun baru" : "Masuk ke akunmu"}
        </Text>

        {isRegistering && (
          <TextInput
            style={local.input}
            placeholder="Nama panggilan"
            value={nama}
            onChangeText={setNama}
          />
        )}

        <TextInput
          style={local.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={local.input}
          placeholder="Password (min. 6 karakter)"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        {pesan !== "" && (
          <Text style={[styles.errorText, { marginTop: 10 }]}>{pesan}</Text>
        )}

        <Pressable
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? "Daftar" : "Masuk"}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            setIsRegistering(!isRegistering);
            setPesan("");
          }}
        >
          <Text style={local.link}>
            {isRegistering
              ? "Sudah punya akun? Masuk di sini"
              : "Belum punya akun? Daftar di sini"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const local = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  link: {
    marginTop: 16,
    color: "#2563eb",
    textAlign: "center",
  },
});
