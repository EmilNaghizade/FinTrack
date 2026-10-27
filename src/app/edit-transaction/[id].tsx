import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useTransactionStore } from "@/store/transactionStore";
import { colors, spacing } from "@/constants/theme";
import TransactionForm from "@/components/transaction/TransactionForm";
import { TransactionCategory } from "@/types/transaction";

type TransactionFormData = {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: TransactionCategory
};
export default function EditTransactionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const transactions = useTransactionStore((state) => state.transactions);
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction,
  );
  const hasHydrated = useTransactionStore((state) => state.hasHydrated);

  const selectedTransaction = transactions.find((transaction) => {
    return transaction.id === id;
  });
  if (!hasHydrated) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.statusText}>Loading transactions...</Text>
      </View>
    );
  }
  if (!selectedTransaction) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.statusText}>Transaction not found</Text>
      </View>
    );
  }

  const handleUpdate = (data: TransactionFormData) => {
    updateTransaction(id, {
      title: data.title,
      amount: data.amount,
      type: data.type,
      category: data.category,
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <TransactionForm
        key={selectedTransaction.id}
        initialTitle={selectedTransaction.title}
        initialAmount={selectedTransaction.amount.toString()}
        initialType={selectedTransaction.type}
        initialCategory={selectedTransaction.category}
        buttonTitle="Update Transaction"
        onSubmit={handleUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },

  statusText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
