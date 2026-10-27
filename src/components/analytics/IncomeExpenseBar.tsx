import { colors, fontSizes, spacing } from "@/constants/theme";
import { Text, View } from "react-native";
import { ChartNoAxesColumn } from "lucide-react-native";

interface IncomeExpenseBarProps {
  incomePercentage: number;
  expensePercentage: number;
}

export default function IncomeExpenseBar({
  incomePercentage,
  expensePercentage,
}: IncomeExpenseBarProps) {
  const hasData = incomePercentage > 0 || expensePercentage > 0;

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 16,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: fontSizes.lg,
          paddingVertical: spacing.md,
          fontWeight: "600",
        }}
      >
        Income vs Expenses
      </Text>

      {hasData ? (
        <>
          <View
            style={{
              flexDirection: "row",
              height: 16,
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: colors.background,
            }}
          >
            <View
              style={{
                flex: incomePercentage,
                backgroundColor: colors.income,
              }}
            />

            <View
              style={{
                flex: expensePercentage,
                backgroundColor: colors.expense,
              }}
            />
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: colors.income }}>
              Income {incomePercentage.toFixed(1)}%
            </Text>

            <Text style={{ color: colors.expense }}>
              Expense {expensePercentage.toFixed(1)}%
            </Text>
          </View>
        </>
      ) : (
        <View
          style={{
            alignItems: "center",
            paddingVertical: 24,
            gap: 12,
          }}
        >
          <ChartNoAxesColumn
            size={36}
            color={colors.primary}
            strokeWidth={1.5}
          />

          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            No financial data yet
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Add your first transaction to see your
            income and expense breakdown.
          </Text>
        </View>
      )}
    </View>
  );
}