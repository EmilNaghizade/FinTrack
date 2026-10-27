import BalanceCard from "@/components/dashboard/BalanceCard";
import EmptyTransactions from "@/components/transaction/NoTransactions";
import TransactionItem from "@/components/transaction/TransactionItem";
import { colors, spacing } from "@/constants/theme";
import { useTransactionStore } from "@/store/transactionStore";
import { typography } from "@/styles/typography";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Feather } from "@expo/vector-icons";
import { calculateBalance } from "@/utils/calculateBalance";

export default function HomeScreen() {
  const transactions = useTransactionStore((state) => state.transactions);
  const { balance, totalIncome, totalExpenses } =
    calculateBalance(transactions);
  const newestFirst = [...transactions].reverse();
  const recentTransactions = newestFirst.slice(0, 5);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#09090B" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              >
                Welcome back 👋
              </Text>

              <Text
                style={{
                  color: colors.text,
                  fontSize: 28,
                  fontWeight: "700",
                }}
              >
                My Dashboard
              </Text>
            </View>
          </View>

          <BalanceCard
            balance={balance}
            income={totalIncome}
            expenses={totalExpenses}
          />
          <View style={styles.transactions}>
            <Text style={typography.sectionTitle}>Recent Transactions</Text>
            <Pressable
              onPress={() => router.push("/transactions")}
              style={styles.seeAllButton}
            >
              <Text style={styles.seeAll}>See All</Text>
              <ArrowRight size={18} color={colors.primary} strokeWidth={2} />
            </Pressable>
          </View>
          <PrimaryButton
            title="+ Add Transaction"
            onPress={() => {
              router.push("/add-transaction");
            }}
          />
          {transactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onPress={() => {
                  router.push({
                    pathname: "/edit-transaction/[id]",
                    params: { id: transaction.id },
                  });
                }}
              />
            ))
          ) : (
            <EmptyTransactions />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  transactions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xl,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});
