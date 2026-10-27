export type TransactionCategory =
  | "food"
  | "shopping"
  | "transport"
  | "bills"
  | "salary"
  | "other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: TransactionCategory;
  date: string;
}
