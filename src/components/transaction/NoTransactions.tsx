import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "@/constants/theme";
import { typography } from "@/styles/typography";

export default function EmptyTransactions() {
  return (
    <View style={styles.container}>
      <Text style={typography.sectionTitle}>
        No transactions yet
      </Text>

      <Text style={typography.secondary}>
        Your recent transactions will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: "center",
    marginTop: spacing.md,
    gap: spacing.sm,
  },
});