import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import type { TransactionCategory } from "@/types/transaction";
import { CATEGORY_INFO } from "@/constants/categories";
import { colors, spacing } from "@/constants/theme";

interface CategoryFilterProps {
  selectedCategory: TransactionCategory | "all";
  onSelectCategory: (category: TransactionCategory | "all") => void;
}

type CategoryFilterValue = TransactionCategory | "all";

const categories = Object.entries(CATEGORY_INFO) as [
  TransactionCategory,
  (typeof CATEGORY_INFO)[TransactionCategory],
][];

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedInfo =
    selectedCategory === "all"
      ? { label: "All Categories", icon: "layers" as const }
      : CATEGORY_INFO[selectedCategory];

  const handleSelect = (category: CategoryFilterValue) => {
    onSelectCategory(category);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by Category</Text>

      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        style={[styles.dropdownButton, isOpen && styles.dropdownButtonActive]}
      >
        <View style={styles.selectedContent}>
          <View style={styles.iconContainer}>
            <Feather
              name={selectedInfo.icon}
              size={20}
              color={colors.primary}
            />
          </View>

          <Text style={styles.selectedText}>{selectedInfo.label}</Text>
        </View>

        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.textSecondary}
        />
      </Pressable>

      {isOpen && (
        <View style={styles.dropdownList}>
          {/* All Categories */}
          <Pressable
            onPress={() => handleSelect("all")}
            style={[
              styles.categoryOption,
              selectedCategory === "all" && styles.selectedOption,
            ]}
          >
            <View style={styles.optionContent}>
              <Feather name="layers" size={19} color={colors.primary} />

              <Text style={styles.optionText}>All Categories</Text>
            </View>

            {selectedCategory === "all" && (
              <Feather name="check" size={19} color={colors.primary} />
            )}
          </Pressable>

          {/* Other categories */}
          {categories.map(([value, info]) => {
            const isSelected = selectedCategory === value;

            return (
              <Pressable
                key={value}
                onPress={() => handleSelect(value)}
                style={[
                  styles.categoryOption,
                  isSelected && styles.selectedOption,
                ]}
              >
                <View style={styles.optionContent}>
                  <Feather
                    name={info.icon}
                    size={19}
                    color={isSelected ? colors.primary : colors.textSecondary}
                  />

                  <Text style={styles.optionText}>{info.label}</Text>
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
