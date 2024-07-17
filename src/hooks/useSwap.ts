import { useEffect } from 'react'

import { ApiTokenAddress, RoutingApi } from '@swap-coffee/sdk'
import { useQuery } from '@tanstack/react-query'

// Store
import { useBlockchainStore } from '@/store/blockchain.store'
import { useTokensStore } from '@/store/token.store'
import { useQuoteStore } from '@/store/quote.store'

// Components
import { useToast } from '@/components/ui/use-toast'

export const useSwap = () => {
  const routingApi = new RoutingApi()

  const { selectedBlockchain } = useBlockchainStore()
  const { quote } = useQuoteStore()
  const { 
    selectedFromToken, selectedReceiveToken,
    setFromInput, setReceiveInput 
  } = useTokensStore()

  const { toast } = useToast()

  const neededDependsCheck = !!(
    selectedBlockchain &&
    selectedFromToken &&
    selectedReceiveToken &&
    quote.amount
  )

  const getAmount = () => {
    if (quote.type === 'input_amount') {
      return {
        input_amount: Number(quote.amount)
      }
    }

    return {
      output_amount: Number(quote.amount)
    }
  }

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
          ...getAmount()
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
      quote.amount,
      selectedFromToken?.address,
      selectedReceiveToken?.address,
    ],
    queryFn: () => getRoute(),
    select: (res) => res.data,
    enabled: neededDependsCheck,
    retry: 3,
  })

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setFromInput(String(query.data.input_amount))
      setReceiveInput(String(query.data.output_amount))
    }
  }, [
    query.isSuccess,
    query.data,
    setFromInput,
    setReceiveInput,
  ])

  useEffect(() => {
    if (query.isError && query.error) {
      toast({
        title: query.error.name,
        description: query.error.message,
      })

      setFromInput('0')
      setReceiveInput('0')
    }
  }, [
    query.isError, 
    query.error, 
    toast, 
    setFromInput, 
    setReceiveInput,
  ])

  return {
    ...query,
  }
}
