import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

type TransactionInput = Omit<ITransaction, "id" | "createdAt">;

interface ITransactionProviderProps {
  children: ReactNode;
}

interface ITransactionContextData {
  transactions: ITransaction[];
  createTransaction(transaction: TransactionInput): Promise<void>;
}

const TransactionContext = createContext<ITransactionContextData>(
  {} as ITransactionContextData
);

export function TransactionsProvider({ children }: ITransactionProviderProps) {
  const [transactions, setTransaction] = useState<ITransaction[]>([]);
  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransaction(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transaction", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransaction([...transactions, transaction]);
  }
  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  return context;
}
