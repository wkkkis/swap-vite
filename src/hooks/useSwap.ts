import { useEffect } from 'react'

import { ApiTokenAddress, RoutingApi } from '@swap-coffee/sdk'
import { useQuery } from '@tanstack/react-query'

// Store
import { useBlockchainStore } from '@/store/blockchain.store'
import { useTokensStore } from '@/store/token.store'

// Components
import { useToast } from '@/components/ui/use-toast'

export const useSwap = (amount?: string) => {
  const routingApi = new RoutingApi()

  const { selectedBlockchain } = useBlockchainStore()
  const { selectedFromToken, selectedReceiveToken } =
    useTokensStore()

  const { toast } = useToast()

  const neededDependsCheck = !!(
    selectedBlockchain &&
    selectedFromToken &&
    selectedReceiveToken &&
    Number(amount)
  )

  const getRoute = async () => {
    if (neededDependsCheck) {
      const assetIn: ApiTokenAddress = {
        blockchain: selectedBlockchain?.name,
        address: selectedFromToken?.address,
      }
      const assetOut: ApiTokenAddress = {
        blockchain: selectedBlockchain?.name,
        address: selectedReceiveToken?.address,
      }

      try {
        const route = await routingApi.buildRoute({
          input_token: assetIn,
          output_token: assetOut,
          output_amount: Number(amount),
        })

        return route
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(new Error('Somethink went wrong'))
  }

  const query = useQuery({
    queryKey: [
      'route',
      amount,
      selectedFromToken?.address,
      selectedReceiveToken?.address,
    ],
    queryFn: () => getRoute(),
    select: (res) => res.data,
    enabled: neededDependsCheck,
    retry: 3,
  })

  useEffect(() => {
    if (query.isError && query.error) {
      toast({
        title: query.error.name,
        description: query.error.message,
      })
    }
  }, [query.isError, query.error, toast])

  return {
    ...query,
  }
}
