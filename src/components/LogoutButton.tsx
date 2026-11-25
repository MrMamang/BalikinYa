import { Pressable, Text } from "react-native";
import { keluar } from "../services/authService";

export function LogoutButton() {
  return (
    <Pressable onPress={() => keluar().catch(() => {})}>
      <Text style={{ color: "#dc2626", fontWeight: "bold" }}>Keluar</Text>
    </Pressable>
  );
}
