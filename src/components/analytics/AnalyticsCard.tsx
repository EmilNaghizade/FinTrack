import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@/constants/formatCurrency";
import { colors } from "@/constants/theme";
interface AnalyticsCardProps {
  title: string;
  amount: number;
  color: string;
}
export default function AnalyticsCard({
  title,
  amount,
  color,
}: AnalyticsCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.amount, { color }]}>₼ {formatCurrency(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    gap: 8,
  },

  title: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  amount: {
    fontSize: 24,
    fontWeight: "700",
  },
});
