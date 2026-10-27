import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import type { Budget } from "@/types/budget";
import { CATEGORY_INFO } from "@/constants/categories";
import { colors, spacing } from "@/constants/theme";
import { calculateBudgetProgress } from "@/utils/calculateBudget";

interface BudgetCardProps {
  budget: Budget;
  spent: number;
}

export function BudgetCard({ budget, spent }: BudgetCardProps) {
  const { remaining, percentage, isOverBudget } = calculateBudgetProgress(
    spent,
    budget.limit,
  );

  const categoryInfo = CATEGORY_INFO[budget.category];

  const progressColor = isOverBudget
    ? colors.expense
    : percentage >= 80
      ? "#f59e0b"
      : colors.primary;

  const progressWidth = Math.min(Math.max(percentage, 0), 100);

  const formattedMonth = new Date(
    `${budget.month}-01T12:00:00`,
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Feather name={categoryInfo.icon} size={22} color={colors.primary} />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title}>{categoryInfo.label} Budget</Text>

          <Text style={styles.month}>{formattedMonth}</Text>
        </View>

        <Text style={[styles.percentage, { color: progressColor }]}>
          {percentage.toFixed(0)}%
        </Text>
      </View>

      {/* Amount */}
      <View style={styles.amountRow}>
        <Text style={styles.amount}>₼ {spent.toFixed(2)}</Text>

        <Text style={styles.limit}>/ ₼ {budget.limit.toFixed(2)}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressWidth}%`,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{percentage.toFixed(0)}% used</Text>

        <Text
          style={[styles.footerText, isOverBudget && styles.overBudgetText]}
        >
          {isOverBudget
            ? `₼ ${Math.abs(remaining).toFixed(2)} over budget`
            : `₼ ${remaining.toFixed(2)} remaining`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3f3f46",
    padding: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.md,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    flex: 1,
    gap: 4,
  },

  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },

  month: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  percentage: {
    fontSize: 15,
    fontWeight: "700",
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },

  amount: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
  },

  limit: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  progressTrack: {
    height: 9,
    backgroundColor: "#3f3f46",
    borderRadius: 99,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 99,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  footerText: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  overBudgetText: {
    color: colors.expense,
    fontWeight: "600",
  },
});
