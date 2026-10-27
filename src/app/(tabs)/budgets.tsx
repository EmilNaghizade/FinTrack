import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import type { Budget } from "@/types/budget";
import { useBudgetStore } from "@/store/budgetStore";
import { useTransactionStore } from "@/store/transactionStore";
import { BudgetCard } from "@/components/budget/BudgetCard";
import { calculateCategorySpending } from "@/utils/calculateBudget";
import { CATEGORY_INFO } from "@/constants/categories";
import { colors, spacing } from "@/constants/theme";
import { typography } from "@/styles/typography";

export default function BudgetsScreen() {
  const budgets = useBudgetStore((state) => state.budgets);
  const updateBudget = useBudgetStore((state) => state.updateBudget);
  const deleteBudget = useBudgetStore((state) => state.deleteBudget);
  const transactions = useTransactionStore((state) => state.transactions);

  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [editLimit, setEditLimit] = useState("");
  const [editError, setEditError] = useState("");

  const now = new Date();

  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1,
  ).padStart(2, "0")}`;

  const formattedMonth = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const monthlyBudgets = budgets.filter(
    (budget) => budget.month === currentMonth,
  );

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setEditLimit(String(budget.limit));
    setEditError("");
  };

  const closeEdit = () => {
    setEditingBudget(null);
    setEditLimit("");
    setEditError("");
  };

  const handleSaveEdit = () => {
    if (!editingBudget) return;

    const normalized = editLimit.trim().replace(",", ".");
    const numericLimit = Number(normalized);

    if (!normalized || !Number.isFinite(numericLimit) || numericLimit <= 0) {
      setEditError("Enter a valid amount greater than 0.");
      return;
    }

    updateBudget(editingBudget.id, numericLimit);
    closeEdit();
  };

  const handleDelete = (budget: Budget) => {
    Alert.alert(
      "Delete Budget",
      `Delete your ${CATEGORY_INFO[budget.category].label} budget?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBudget(budget.id),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={typography.heading}>My Budgets</Text>
          <Text style={styles.subtitle}>
            Track your monthly spending limits
          </Text>

          <View style={styles.monthBadge}>
            <Feather name="calendar" size={14} color={colors.primary} />
            <Text style={styles.monthText}>{formattedMonth}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/add-budget")}
          style={styles.addButton}
          accessibilityRole="button"
        >
          <Feather name="plus" size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>Create Budget</Text>
        </Pressable>

        {monthlyBudgets.length > 0 ? (
          <View style={styles.budgetList}>
            {monthlyBudgets.map((budget) => {
              const spent = calculateCategorySpending(
                transactions,
                budget.category,
                budget.month,
              );

              return (
                <View key={budget.id}>
                  <BudgetCard budget={budget} spent={spent} />

                  <View style={styles.actions}>
                    <Pressable
                      onPress={() => handleEdit(budget)}
                      style={styles.editButton}
                      accessibilityRole="button"
                      accessibilityLabel={`Edit ${budget.category} budget`}
                    >
                      <Feather name="edit-2" size={16} color={colors.primary} />
                      <Text style={styles.editText}>Edit Limit</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => handleDelete(budget)}
                      style={styles.deleteButton}
                      accessibilityRole="button"
                      accessibilityLabel={`Delete ${budget.category} budget`}
                    >
                      <Feather
                        name="trash-2"
                        size={16}
                        color={colors.expense}
                      />
                      <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Feather name="pie-chart" size={36} color={colors.primary} />
            </View>

            <Text style={styles.emptyTitle}>No budgets yet</Text>

            <Text style={styles.emptyDescription}>
              Create your first monthly budget to start tracking your spending.
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={editingBudget !== null}
        transparent
        animationType="fade"
        onRequestClose={closeEdit}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Budget</Text>

              <Pressable
                onPress={closeEdit}
                accessibilityRole="button"
                accessibilityLabel="Close edit budget"
              >
                <Feather name="x" size={22} color={colors.textSecondary} />
              </Pressable>
            </View>

            {editingBudget && (
              <Text style={styles.modalSubtitle}>
                {CATEGORY_INFO[editingBudget.category].label} Budget
              </Text>
            )}

            <Text style={styles.inputLabel}>Monthly Limit (₼)</Text>

            <TextInput
              value={editLimit}
              onChangeText={(value) => {
                setEditLimit(value);
                setEditError("");
              }}
              keyboardType="decimal-pad"
              placeholder="Enter new limit"
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, !!editError && styles.inputError]}
            />

            {!!editError && <Text style={styles.errorText}>{editError}</Text>}

            <View style={styles.modalActions}>
              <Pressable onPress={closeEdit} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable onPress={handleSaveEdit} style={styles.saveButton}>
                <Text style={styles.saveText}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  header: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  monthBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    gap: 8,
  },
  monthText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
    minHeight: 50,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  budgetList: {
    gap: spacing.lg,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.md,
    marginTop: -spacing.sm,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: spacing.sm,
  },
  editText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: spacing.sm,
  },
  deleteText: {
    color: colors.expense,
    fontSize: 13,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  emptyDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    gap: spacing.md,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  modalSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  inputLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.background,
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
  modalActions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelText: {
    color: colors.text,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
