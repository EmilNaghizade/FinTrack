import { StyleSheet, Text, View } from "react-native";
import { formatCurrency } from "@/constants/formatCurrency";
import { typography } from "@/styles/typography";
import { colors } from "@/constants/theme";
interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}



export default function BalanceCard({
  balance,
  income,
  expenses,
}: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={typography.secondary}>Total Balance</Text>
      <Text style={typography.heading}>₼ {formatCurrency(balance)}</Text>
      <View style={styles.divider} />
      <View style={styles.incomeExpensesContainer}>
        <View>
          <Text style={typography.secondary}>Income</Text>
          <Text style={styles.income}>₼ {formatCurrency(income)}</Text>
        </View>
        <View>
          <Text style={typography.secondary}>Expenses</Text>
          <Text style={styles.expenses}>₼ {formatCurrency(expenses)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 20,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.background,
    marginVertical: 20,
  },
  incomeExpensesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  income: {
    color: colors.income,
    fontSize: 18,
    fontWeight: "600",
  },
  expenses: {
    color: colors.expense,
    fontSize: 18,
    fontWeight: "600",
  },
});
