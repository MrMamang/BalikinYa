import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "BalikinYa", headerShown: false }} />
      <Stack.Screen name="kontak" options={{ title: "Daftar Kontak" }} />
      <Stack.Screen name="detail/[id]" options={{ title: "Detail Pinjaman" }} />
    </Stack>
  );
}
