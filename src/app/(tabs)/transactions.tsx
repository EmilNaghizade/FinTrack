import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "@/constants/theme";
import { typography } from "@/styles/typography";
import { useTransactionStore } from "@/store/transactionStore";
import TransactionItem from "@/components/transaction/TransactionItem";
import EmptyTransactions from "@/components/transaction/NoTransactions";
import { router } from "expo-router";
import type { TransactionCategory } from "@/types/transaction";
import CategoryFilter from "@/components/transaction/CategoryFilter";
import { Feather } from "@expo/vector-icons";

export default function TransactionsScreen() {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = useTransactionStore((state) => state.transactions);
  const newestFirst = [...transactions].reverse();
  const [categoryFilter, setCategoryFilter] = useState<
    TransactionCategory | "all"
  >("all");
  const filteredTransactions = newestFirst.filter((transaction) => {
    const matchesType = filter === "all" || transaction.type === filter;

    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      (transaction.category ?? "other") === categoryFilter;

    return matchesType && matchesSearch && matchesCategory;
  });

  const hasActiveFilters =
    searchQuery.trim() !== "" || filter !== "all" || categoryFilter !== "all";
  const clearFilters = () => {
    setSearchQuery("");
    setFilter("all");
    setCategoryFilter("all");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View style={styles.header}>
            <Text style={typography.heading}>Transactions</Text>

            {hasActiveFilters && (
              <Pressable
                onPress={clearFilters}
                accessibilityRole="button"
                accessibilityLabel="Clear all filters"
              >
                <Text style={styles.clearFiltersText}>Clear Filters</Text>
              </Pressable>
            )}
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search transactions..."
            placeholderTextColor={colors.textSecondary}
            style={styles.searchInput}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Pressable
              onPress={() => setFilter("all")}
              style={{
                backgroundColor:
                  filter === "all" ? colors.primary : colors.surface,
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: colors.text }}>All</Text>
            </Pressable>
            <Pressable
              onPress={() => setFilter("income")}
              style={{
                backgroundColor:
                  filter === "income" ? colors.primary : colors.surface,
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: colors.text }}>Income</Text>
            </Pressable>
            <Pressable
              onPress={() => setFilter("expense")}
              style={{
                backgroundColor:
                  filter === "expense" ? colors.primary : colors.surface,
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: colors.text }}>Expense</Text>
            </Pressable>
          </View>
          <View style={{ marginBottom: spacing.lg }}>
            <CategoryFilter
              selectedCategory={categoryFilter}
              onSelectCategory={setCategoryFilter}
            />
          </View>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
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
          ) : transactions.length === 0 ? (
            <EmptyTransactions />
          ) : (
            <View style={styles.noResults}>
              <Feather name="search" size={36} color={colors.textSecondary} />
              <Text style={styles.noResultsTitle}>
                No matching transactions
              </Text>
              <Text style={styles.noResultsDescription}>
                Try adjusting your search or filters.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: spacing.md,
    borderRadius: 12,
  },
  noResults: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
  },
  noResultsTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
  },
  noResultsDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  clearFiltersText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
});
