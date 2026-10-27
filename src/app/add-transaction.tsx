import { View, StyleSheet, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";

import TransactionForm from "@/components/transaction/TransactionForm";
import { useTransactionStore } from "@/store/transactionStore";
import { colors, spacing } from "@/constants/theme";
import { TransactionCategory } from "@/types/transaction";

type TransactionFormData = {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: TransactionCategory;
};

export default function AddTransactionScreen() {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleSave = (data: TransactionFormData) => {
    const newTransaction = {
      id: Date.now().toString(),
      title: data.title,
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={24} color={colors.text} strokeWidth={2} />
        </Pressable>

        <Text style={styles.title}>Add Transaction</Text>
      </View>

      <Text style={styles.description}>
        Record your income and expenses to keep your finances organized.
      </Text>

      <View style={styles.formContainer}>
        <TransactionForm buttonTitle="Save Transaction" onSubmit={handleSave} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: spacing.lg,
    marginBottom: 24,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.7,
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "700",
  },

  description: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },

  formContainer: {
    flex: 1,
  },
});
