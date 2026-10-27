import type { Transaction } from "@/types/transaction";

export function groupTransactionsByMonth(transactions: Transaction[]) {
  const monthlyData: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);

    const year = date.getFullYear();
    const month = date.getMonth();

    const monthKey = `${year}-${month}`;
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        income: 0,
        expenses: 0,
      };
    }
    if (transaction.type === "income") {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }
  });
  const result = Object.entries(monthlyData).map(([month, values]) => {
    return {
      month,
      income: values.income,
      expenses: values.expenses,
    };
  });

  result.sort((a, b) => {
    const [yearA, monthA] = a.month.split("-").map(Number);
    const [yearB, monthB] = b.month.split("-").map(Number);

    if (yearA !== yearB) {
      return yearA - yearB;
    }

    return monthA - monthB;
  });

  const lastSixMonths =result.slice(-6)

  return lastSixMonths;
}
