import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import type { TransactionCategory } from "@/types/transaction";
import { colors, spacing } from "@/constants/theme";

interface CategoryPickerProps {
  selectedCategory: TransactionCategory;
  onSelectCategory: (category: TransactionCategory) => void;
  type: "income" | "expense";
}

type CategoryItem = {
  label: string;
  value: TransactionCategory;
  icon: React.ComponentProps<typeof Feather>["name"];
};

const categories: CategoryItem[] = [
  { label: "Food", value: "food", icon: "coffee" },
  { label: "Shopping", value: "shopping", icon: "shopping-bag" },
  { label: "Transport", value: "transport", icon: "truck" },
  { label: "Bills", value: "bills", icon: "file-text" },
  { label: "Salary", value: "salary", icon: "dollar-sign" },
  { label: "Other", value: "other", icon: "more-horizontal" },
];

export default function CategoryPicker({
  selectedCategory,
  onSelectCategory,
  type,
}: CategoryPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filteredCategories = categories.filter((category) => {
    if (type === "income") {
      return ["salary", "other"].includes(category.value);
    }

    return category.value !== "salary";
  });
  const selectedItem = categories.find(
    (item) => item.value === selectedCategory,
  );

  const handleSelect = (category: TransactionCategory) => {
    onSelectCategory(category);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>

      {/* Selected category */}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen((prev) => !prev)}
        style={[styles.dropdownButton, isOpen && styles.dropdownButtonActive]}
      >
        <View style={styles.selectedContent}>
          <View style={styles.iconContainer}>
            <Feather
              name={selectedItem?.icon ?? "more-horizontal"}
              size={20}
              color={colors.primary}
            />
          </View>

          <Text style={styles.selectedText}>
            {selectedItem?.label ?? "Select Category"}
          </Text>
        </View>

        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.textSecondary}
        />
      </Pressable>

      {/* Dropdown options */}
      {isOpen && (
        <View style={styles.dropdownList}>
          {filteredCategories.map((category) => {
            const isSelected = selectedCategory === category.value;

            return (
              <Pressable
                key={category.value}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => handleSelect(category.value)}
                style={[
                  styles.categoryOption,
                  isSelected && styles.selectedOption,
                ]}
              >
                <View style={styles.optionContent}>
                  <Feather
                    name={category.icon}
                    size={19}
                    color={isSelected ? colors.primary : colors.textSecondary}
                  />

                  <Text style={styles.optionText}>{category.label}</Text>
                </View>

                {isSelected && (
                  <Feather name="check" size={19} color={colors.primary} />
                )}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },

  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },

  dropdownButton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "transparent",
  },

  dropdownButtonActive: {
    borderColor: colors.primary,
  },

  selectedContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
  },

  dropdownList: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.sm,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.2)",
  },

  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: 8,
  },

  selectedOption: {
    backgroundColor: "rgba(139, 92, 246, 0.12)",
  },

  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  optionText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
});
