import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { typography } from "@/styles/typography";
import { useTransactionStore } from "@/store/transactionStore";
import { calculateBalance } from "@/utils/calculateBalance";
import AnalyticsCard from "@/components/analytics/AnalyticsCard";
import IncomeExpenseBar from "@/components/analytics/IncomeExpenseBar";
import MonthlyChart from "@/components/analytics/MonthlyChart";
import { getMonthlyChartData } from "@/utils/getMonthlyChartData";

export default function AnalyticsScreen() {
  const transactions = useTransactionStore((state) => state.transactions);
  const monthlyData = getMonthlyChartData(transactions);
  const { balance, totalIncome, totalExpenses } =
    calculateBalance(transactions);
  const total = totalIncome + totalExpenses;

  const incomePercentage = total > 0 ? (totalIncome / total) * 100 : 0;
  const expensePercentage = total > 0 ? (totalExpenses / total) * 100 : 0;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#09090B",
      }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#09090b" }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 32,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={typography.heading}>Analytics</Text>

        <AnalyticsCard
          title="Net Balance"
          amount={balance}
          color={colors.text}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <AnalyticsCard
              title="Total Income"
              amount={totalIncome}
              color={colors.income}
            />
          </View>

          <View style={{ flex: 1 }}>
            <AnalyticsCard
              title="Total Expenses"
              amount={totalExpenses}
              color={colors.expense}
            />
          </View>
        </View>
        <IncomeExpenseBar
          incomePercentage={incomePercentage}
          expensePercentage={expensePercentage}
        />
        <MonthlyChart data={monthlyData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 16,
  },
});
