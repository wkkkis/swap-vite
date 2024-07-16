import { create } from 'zustand'

// Interfaces
import { IToken } from '@/store/token.store'

interface ITransaction {
  fromToken: IToken
  receiveToken: IToken
  fromAmount: string
  receiveAmount: string
}

interface ITransactionsState {
  transactions: [] | ITransaction[]
}

interface ITransactionActions {
  setTransactions: (data: ITransaction) => void
}

type BlockchainStoreType = ITransactionsState &
  ITransactionActions

const useTransactionsStore = create<BlockchainStoreType>(
  (set, get) => ({
    transactions: [],

    setTransactions: async (data) => {
      set({
        transactions: [...get().transactions, data],
      })
    },
  })
)

export type {
  ITransaction,
  ITransactionsState,
  BlockchainStoreType,
}

export { useTransactionsStore }
