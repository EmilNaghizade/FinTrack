import { Stack } from "expo-router";
import { colors } from "@/constants/theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "600",
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: "dashboard",
        }}
      />

      <Stack.Screen
        name="add-transaction"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="add-budget"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="edit-transaction/[id]"
        options={{
          title: "Edit Transaction",
        }}
      />
    </Stack>
  );
}
