import type { Transaction } from "@/types/transaction";

export function calculateBalance(transactions: Transaction[]) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);

  const balance = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    balance,
  };
}
