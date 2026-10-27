import type { Transaction, TransactionCategory } from "@/types/transaction";

export function calculateCategorySpending(
  transactions: Transaction[],
  category: TransactionCategory,
  month: string,
): number {
  return transactions
    .filter((transaction) => {
      const matchesType = transaction.type === "expense";
      const matchesCategory = transaction.category === category;
      const matchesMonth = transaction.date.slice(0, 7) === month;

      return matchesType && matchesCategory && matchesMonth;
    })
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function calculateBudgetProgress(spent: number, limit: number) {
  const remaining = limit - spent;
  const percentage = limit > 0 ? (spent / limit) * 100 : 0;
  const isOverBudget = spent > limit;

  return {
    remaining,
    percentage,
    isOverBudget,
  };
}
