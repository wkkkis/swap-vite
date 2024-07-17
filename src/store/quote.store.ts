import { create } from 'zustand'

interface IQuote {
  type: 'input_amount' | 'output_amount',
  amount: string
}

interface IQouteState {
  quote: IQuote
}

interface IQuoteActions {
  setQuoteData: (data: IQuote) => void
}

type QuoteStoreType = IQouteState & IQuoteActions

const useQuoteStore = create<QuoteStoreType>((set) => ({
  quote: {
    type: 'input_amount',
    amount: '0'
  },

  inputLoad: false,
  outputLoad: false,

  setQuoteData: (data) => {
    set({
      quote: data,
    })
  },
}))

export type {
  IQuote,
  IQouteState,
  IQuoteActions,
  QuoteStoreType
}

export { useQuoteStore }
