import type { Budget } from "@/types/budget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type BudgetStore = {
  budgets: Budget[];

  addBudget: (budget: Budget) => void;

  deleteBudget: (id: string) => void;

  updateBudget: (id: string, limit: number) => void;
};

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      budgets: [],

      addBudget: (budget) => {
        set((state) => {
          const alreadyExists = state.budgets.some(
            (existingBudget) =>
              existingBudget.category === budget.category &&
              existingBudget.month === budget.month,
          );

          if (alreadyExists) {
            return state;
          }

          return {
            budgets: [...state.budgets, budget],
          };
        });
      },

      deleteBudget: (id) => {
        set((state) => ({
          budgets: state.budgets.filter((budget) => budget.id !== id),
        }));
      },

      updateBudget: (id, limit) => {
        set((state) => ({
          budgets: state.budgets.map((budget) => {
            if (budget.id === id) {
              return {
                ...budget,
                limit,
              };
            }

            return budget;
          }),
        }));
      },
    }),
    {
      name: "fintrack-budgets",

      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
