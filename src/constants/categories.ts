import type { TransactionCategory } from "@/types/transaction";
import { Feather } from "@expo/vector-icons";

type CategoryInfo = {
  label: string;
  icon: React.ComponentProps<typeof Feather>["name"];
};

export const CATEGORY_INFO: Record<TransactionCategory, CategoryInfo> = {
  food: { label: "Food", icon: "coffee" },
  shopping: { label: "Shopping", icon: "shopping-bag" },
  transport: { label: "Transport", icon: "truck" },
  bills: { label: "Bills", icon: "file-text" },
  salary: { label: "Salary", icon: "dollar-sign" },
  other: { label: "Other", icon: "more-horizontal" },
};