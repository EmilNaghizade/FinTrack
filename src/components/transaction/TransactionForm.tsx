import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { colors, spacing } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import CategoryPicker from "@/components/transaction/CategoryPicker";
import type { TransactionCategory } from "@/types/transaction";

interface TransactionFormProps {
  initialTitle?: string;
  initialAmount?: string;
  initialType?: "income" | "expense";
  buttonTitle: string;
  initialCategory?: TransactionCategory;
  onSubmit: (data: {
    title: string;
    amount: number;
    type: "income" | "expense";
    category: TransactionCategory;
  }) => void;
}
export default function TransactionForm({
  initialTitle = "",
  initialAmount = "",
  initialType = "expense",
  initialCategory = "other",
  buttonTitle,
  onSubmit,
}: TransactionFormProps) {
  const [title, setTitle] = useState(initialTitle);

  const [amount, setAmount] = useState(initialAmount);

  const [type, setType] = useState<"income" | "expense">(initialType);

  const [titleError, setTitleError] = useState("");

  const [amountError, setAmountError] = useState("");
  const [category, setCategory] =
    useState<TransactionCategory>(initialCategory);

  const handleSubmit = () => {
    const normalizedAmount = amount.trim().replace(",", ".");
    const numericAmount = Number(normalizedAmount);

    setTitleError("");
    setAmountError("");

    if (title.trim() === "") {
      setTitleError("Title is required");
      return;
    }

    if (amount.trim() === "") {
      setAmountError("Amount is required");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setAmountError("Amount must be a valid positive number");
      return;
    }

    const result = onSubmit({
      title: title.trim(),
      amount: numericAmount,
      type,
      category,
    });

    return result;
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={(value) => {
          setTitle(value);
          setTitleError("");
        }}
        placeholder="Transaction title"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />

      {titleError !== "" && <Text style={styles.errorText}>{titleError}</Text>}

      <TextInput
        value={amount}
        onChangeText={(value) => {
          setAmount(value);
          setAmountError("");
        }}
        placeholder="Transaction amount"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        keyboardType="decimal-pad"
      />

      {amountError !== "" && (
        <Text style={styles.errorText}>{amountError}</Text>
      )}

      <View style={styles.typeContainer}>
        <Pressable
          onPress={() => setType("expense")}
          style={[
            styles.typeButton,
            type === "expense" && styles.selectedButton,
          ]}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Expense</Text>
        </Pressable>

        <Pressable
          onPress={() => setType("income")}
          style={[
            styles.typeButton,
            type === "income" && styles.selectedButton,
          ]}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Income</Text>
        </Pressable>
      </View>
      <CategoryPicker
        type={type}
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
      <PrimaryButton title={buttonTitle} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },

  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: spacing.md,
    borderRadius: 12,
  },

  typeContainer: {
    flexDirection: "row",
    gap: spacing.sm,
    marginVertical: spacing.sm,
  },

  typeButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: colors.surface,
  },

  selectedButton: {
    backgroundColor: colors.primary,
  },

  errorText: {
    color: colors.expense,
    fontSize: 12,
  },
});
