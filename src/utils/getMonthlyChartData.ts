import type { Transaction } from "@/types/transaction";
import { getLastSixMonths } from "./getLastSixMonths";
import { groupTransactionsByMonth } from "./groupTransactionsByMonth";

export function getMonthlyChartData(transactions: Transaction[]) {
  const months = getLastSixMonths();
  const monthlyData = groupTransactionsByMonth(transactions);

  const result = months.map((month) => {
    const found = monthlyData.find((item) => item.month === month);

    return {
      month,
      income: found ? found.income : 0,
      expenses: found ? found.expenses : 0,
    };
  });

  return result;
}
