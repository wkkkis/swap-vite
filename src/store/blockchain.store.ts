import { create } from 'zustand'

interface IBlockchain {
  id: number
  name: string
}

interface IBlockchainState {
  selectedBlockchain: null | IBlockchain

  blockchains: null | IBlockchain[]
}

interface IBlockchainActions {
  setSelectedBlockchain: (data: IBlockchain) => void

  setBlockchains: (data: IBlockchain[]) => Promise<void>
}

type BlockchainStoreType = IBlockchainState &
  IBlockchainActions

const useBlockchainStore = create<BlockchainStoreType>(
  (set) => ({
    selectedBlockchain: null,
    blockchains: null,

    setBlockchains: async (data) => {
      set({
        blockchains: data,
      })
    },
    setSelectedBlockchain: (data) => {
      set({
        selectedBlockchain: data,
      })
    },
  })
)

export type {
  IBlockchain,
  IBlockchainActions,
  BlockchainStoreType,
}

export { useBlockchainStore }
