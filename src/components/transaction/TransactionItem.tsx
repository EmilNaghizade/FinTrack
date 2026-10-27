import { formatCurrency } from "@/constants/formatCurrency";
import { colors } from "@/constants/theme";
import { typography } from "@/styles/typography";
import type { Transaction } from "@/types/transaction";
import { StyleSheet, Text, View, Alert, Pressable } from "react-native";
import { useTransactionStore } from "@/store/transactionStore";
import { Feather } from "@expo/vector-icons";
import { CATEGORY_INFO } from "@/constants/categories";

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export default function TransactionItem({
  transaction,
  onPress,
}: TransactionItemProps) {
  const categoryInfo = CATEGORY_INFO[transaction.category ?? "other"];
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  );

  const isIncome = transaction.type === "income";
  const date = new Date(transaction.date);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction?",
      `Are you sure you want to delete "${transaction.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(transaction.id),
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole="button"
        accessibilityLabel={`Edit ${transaction.title}`}
        style={styles.transactionInfo}
      >
        <View style={styles.categoryIcon}>
          <Feather name={categoryInfo.icon} size={20} color={colors.primary} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.transactionTitle} numberOfLines={1}>
            {transaction.title}
          </Text>

          <Text style={styles.categoryLabel}>
            {categoryInfo.label} · {formattedDate}
          </Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Text style={isIncome ? styles.income : styles.expense}>
          {isIncome ? "+" : "-"} ₼ {formatCurrency(transaction.amount)}
        </Text>

        <Pressable
          onPress={handleDelete}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${transaction.title}`}
          hitSlop={10}
          style={styles.deleteButton}
        >
          <Feather name="trash-2" size={18} color={colors.expense} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  income: {
    color: colors.income,
    fontWeight: "600",
  },
  expense: {
    color: colors.expense,
    fontWeight: "600",
  },

  deleteButton: {
    padding: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
  },
  transactionInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },

  textContainer: {
    flex: 1,
    gap: 4,
  },

  transactionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  deleteText: {
    color: colors.expense,
    fontSize: 18,
    fontWeight: "600",
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
