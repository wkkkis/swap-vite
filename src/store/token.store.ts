import { create } from 'zustand'

// Utils
import { DEFAULT_SELECTED_FROM_TOKEN } from '@/utils/constants'

interface IToken {
  id: number
  blockchain_id: number
  address: string
  name: string
  symbol: string
  decimals: number
  price_usd: number
  price_change_24h: number
  tvl: number
  holders_count: number
  image: string
  external_id: null | string | number
  stacking_pool_id: null | string | number
  stacking_pool: null | {
    id: number
    address: string
    name: string
    image_url: string
    unstake_url: string
    exchange_rate: number
    cycle_end: number
  }
}

interface ITokensState {
  tokens: null | IToken[]

  selectedFromToken: null | IToken
  selectedReceiveToken: null | IToken

  fromAmount: string
  receiveAmount: string
}

interface ITokensStateActions {
  setTokens: (data: IToken[]) => Promise<void>

  setSelectedFromToken: (data: IToken) => void
  setSelectedReceiveToken: (data: IToken) => void

  setFromInput: (value: string) => void
  setReceiveInput: (value: string) => void
}

type TokensStoreType = ITokensState & ITokensStateActions

const useTokensStore = create<TokensStoreType>((set) => ({
  tokens: null,

  selectedFromToken: DEFAULT_SELECTED_FROM_TOKEN,
  selectedReceiveToken: null,

  fromAmount: '0',
  receiveAmount: '0',

  setTokens: async (data) => {
    set({
      tokens: data,
    })
  },

  setSelectedFromToken: (data) => {
    set({
      selectedFromToken: data,
    })
  },
  setSelectedReceiveToken: (data) => {
    set({
      selectedReceiveToken: data,
    })
  },

  setFromInput: (value) => {
    set({
      fromAmount: value,
    })
  },
  setReceiveInput: (value) => {
    set({
      receiveAmount: value,
    })
  },
}))

export type {
  IToken,
  ITokensState,
  ITokensStateActions,
  TokensStoreType,
}

export { useTokensStore }
