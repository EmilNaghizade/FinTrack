import { TransactionCategory } from "./transaction";

export interface Budget{
    id: string,
    category: TransactionCategory,
    limit: number,
    month: string
}