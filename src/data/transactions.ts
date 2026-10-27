import type { Transaction } from "@/types/transaction";

export const transactions: Transaction[] = [
  {
    id: "1",
    title: "Shopping",
    amount: 85,
    type: "expense",
    date: "19 Oct 2026",
  },
  {
    id: "2",
    title: "Salary",
    amount: 2500,
    type: "income",
    date: "18 Oct 2026",
  },
  {
    id: "3",
    title: "Coffee",
    amount: 12,
    type: "expense",
    date: "18 Oct 2026",
  },
];
