import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

import type { TransactionCategory } from "@/types/transaction";
import type { Budget } from "@/types/budget";
import { useBudgetStore } from "@/store/budgetStore";
import CategoryPicker from "@/components/transaction/CategoryPicker";
import { colors, spacing } from "@/constants/theme";

export default function AddBudgetScreen() {
  const [category, setCategory] = useState<TransactionCategory>("food");

  const [limit, setLimit] = useState("");
  const [limitError, setLimitError] = useState("");

  const budgets = useBudgetStore((state) => state.budgets);
  const addBudget = useBudgetStore((state) => state.addBudget);

  const now = new Date();

  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1,
  ).padStart(2, "0")}`;

  const formattedMonth = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleCreateBudget = () => {
    setLimitError("");

    const normalizedLimit = limit.trim().replace(",", ".");
    const numericLimit = Number(normalizedLimit);

    if (
      !normalizedLimit ||
      !Number.isFinite(numericLimit) ||
      numericLimit <= 0
    ) {
      setLimitError("Please enter a valid amount greater than 0.");
      return;
    }

    const alreadyExists = budgets.some(
      (budget) => budget.category === category && budget.month === currentMonth,
    );

    if (alreadyExists) {
      Alert.alert(
        "Budget Already Exists",
        "You already have a budget for this category and month.",
      );
      return;
    }

    const newBudget: Budget = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      category,
      limit: numericLimit,
      month: currentMonth,
    };

    addBudget(newBudget);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Feather name="arrow-left" size={22} color={colors.text} />
            </Pressable>

            <Text style={styles.heading}>Create Budget</Text>
          </View>

          <Text style={styles.subtitle}>
            Set a monthly spending limit for a category.
          </Text>

          {/* Category */}
          <View style={styles.field}>
            <CategoryPicker
              type="expense"
              selectedCategory={category}
              onSelectCategory={setCategory}
            />
          </View>

          {/* Monthly Limit */}
          <View style={styles.field}>
            <Text style={styles.label}>Monthly Limit (₼)</Text>

            <TextInput
              value={limit}
              onChangeText={(value) => {
                setLimit(value);
                if (limitError) setLimitError("");
              }}
              placeholder="e.g. 500"
              placeholderTextColor={colors.textSecondary}
              keyboardType="decimal-pad"
              style={[styles.input, !!limitError && styles.inputError]}
            />

            {!!limitError && <Text style={styles.errorText}>{limitError}</Text>}
          </View>

          {/* Month */}
          <View style={styles.field}>
            <Text style={styles.label}>Month</Text>

            <View style={styles.monthContainer}>
              <Feather name="calendar" size={20} color={colors.primary} />

              <Text style={styles.monthText}>{formattedMonth}</Text>
            </View>

            <Text style={styles.helperText}>
              Budgets are currently created for the current month.
            </Text>
          </View>

          {/* Submit */}
          <Pressable
            onPress={handleCreateBudget}
            style={styles.submitButton}
            accessibilityRole="button"
          >
            <Feather name="plus-circle" size={20} color="#ffffff" />

            <Text style={styles.submitText}>Create Budget</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.lg,
    paddingBottom: 48,
    gap: spacing.lg,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },

  field: {
    gap: spacing.sm,
  },

  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },

  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: spacing.md,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },

  inputError: {
    borderColor: colors.expense,
  },

  errorText: {
    color: colors.expense,
    fontSize: 12,
  },

  monthContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  monthText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
  },

  helperText: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
    minHeight: 52,
  },

  submitText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
