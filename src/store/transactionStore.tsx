import type { Transaction } from "@/types/transaction";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LegacyTransaction = Omit<Transaction, "category"> & {
  category?: Transaction["category"];
};

type LegacyPersistedState = {
  transactions?: LegacyTransaction[];
};

type TransactionStore = {
  transactions: Transaction[];

  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (
    id: string,
    updatedData: Partial<Omit<Transaction, "id">>,
  ) => void;

  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
};

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],

      hasHydrated: false,

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },

      addTransaction: (transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== id,
          ),
        }));
      },

      updateTransaction: (id, updatedData) => {
        set((state) => ({
          transactions: state.transactions.map((transaction) => {
            if (transaction.id === id) {
              return {
                ...transaction,
                ...updatedData,
              };
            }

            return transaction;
          }),
        }));
      },
    }),
    {
      name: "fintrack-transactions",

      storage: createJSONStorage(() => AsyncStorage),

      version: 1,

      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          const oldState = persistedState as LegacyPersistedState;

          return {
            transactions: (oldState.transactions ?? []).map((transaction) => ({
              ...transaction,
              category: transaction.category ?? "other",
            })),
          };
        }

        return persistedState as TransactionStore;
      },

      partialize: (state) => ({
        transactions: state.transactions,
      }),

      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Hydration failed:", error);
          }

          state?.setHasHydrated(true);
        };
      },
    },
  ),
);
