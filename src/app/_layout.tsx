import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { LogoutButton } from "../components/LogoutButton";

function RootNavigator() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Route guard: cek setiap sesi atau rute berubah
  useEffect(() => {
    if (isLoading) return; // tunggu pemulihan sesi selesai
    const inAuthGroup = (segments[0] as string) === "(auth)";
    if (!session && !inAuthGroup) {
      router.replace("/(auth)/login"); // belum login -> paksa ke login
    } else if (session && inAuthGroup) {
      router.replace("/"); // sudah login -> jangan tetap di login
    }
  }, [session, isLoading, segments]);

  // Spinner selama sesi dipulihkan, supaya tidak ada kedip layar login
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Beranda", headerRight: () => <LogoutButton /> }}
      />
      <Stack.Screen name="kontak" options={{ title: "Daftar Kontak" }} />
      <Stack.Screen name="detail/[id]" options={{ title: "Detail Pinjaman" }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
