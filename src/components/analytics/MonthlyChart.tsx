import { View, Text, StyleSheet } from "react-native";
import { formatMonth } from "@/utils/formatMonth";

interface MonthlyChartProps {
  data: {
    month: string;
    income: number;
    expenses: number;
  }[];
}

export default function MonthlyChart({ data }: MonthlyChartProps) {
  const maxValue = Math.max(
    1,
    ...data.map((item) => item.income),
    ...data.map((item) => item.expenses),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Overview</Text>
      <Text style={styles.subtitle}>Last 6 months</Text>

      {[...data].reverse().map((item) => {
        const incomePercentage = (item.income / maxValue) * 100;
        const expensePercentage = (item.expenses / maxValue) * 100;
        const isEmptyMonth = item.income === 0 && item.expenses === 0;

        return (
          <View key={item.month} style={styles.monthContainer}>
            {/* Month Title */}
            <Text style={styles.monthTitle}>{formatMonth(item.month)}</Text>

            {isEmptyMonth ? (
              <Text style={styles.emptyText}>No transactions</Text>
            ) : (
              <>
                <View style={styles.labelRow}>
                  <Text style={styles.subtitle}>Income</Text>
                  <Text style={styles.amount}>₼{item.income.toFixed(2)}</Text>
                </View>

                <View style={styles.track}>
                  <View
                    style={[
                      styles.bar,
                      {
                        backgroundColor: "#8b5cf6",
                        width: `${incomePercentage}%` as `${number}%`,
                      },
                    ]}
                  />
                </View>

                <View style={[styles.labelRow, { marginTop: 12 }]}>
                  <Text style={styles.subtitle}>Expenses</Text>
                  <Text style={styles.amount}>₼{item.expenses.toFixed(2)}</Text>
                </View>

                <View style={styles.track}>
                  <View
                    style={[
                      styles.bar,
                      {
                        backgroundColor: "#ef4444",
                        width: `${expensePercentage}%` as `${number}%`,
                      },
                    ]}
                  />
                </View>
              </>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#18181b",
    padding: 20,
    borderRadius: 16,
  },
  emptyText: {
    color: "#71717a",
    fontSize: 13,
    marginTop: 4,
  },
  title: {
    color: "#fafafa",
    fontSize: 18,
    fontWeight: "600",
  },

  subtitle: {
    color: "#a1a1aa",
    fontSize: 13,
    marginTop: 4,
  },

  monthContainer: {
    marginTop: 24,
  },

  monthTitle: {
    color: "#fafafa",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amount: {
    color: "#e4e4e7",
    fontSize: 13,
    fontWeight: "500",
  },

  track: {
    backgroundColor: "#27272a",
    height: 10,
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 8,
  },

  bar: {
    height: "100%",
    borderRadius: 6,
  },
});
