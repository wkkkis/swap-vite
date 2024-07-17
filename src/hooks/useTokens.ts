import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

// Api
import { ApiService } from '@/api/api.service'

// Store
import { useTokensStore } from '@/store/token.store'
import { useBlockchainStore } from '@/store/blockchain.store'

// Components
import { useToast } from '@/components/ui/use-toast'

const useTokensRequest = () => {
  const { selectedBlockchain } = useBlockchainStore()
  const { tokens, setTokens } = useTokensStore()

  const { toast } = useToast()

  const blockchain_id = selectedBlockchain?.id ?? 0

  const query = useQuery({
    queryKey: ['tokens', blockchain_id],
    queryFn: async () => ApiService.getTokens(blockchain_id),
    select: (res) => res.data,
    enabled: !!blockchain_id && !tokens,
  })

  useEffect(() => {
    if (query.isSuccess && query.data?.length) {
      setTokens(query.data)
    }
  }, [query.isSuccess, query.data])

  useEffect(() => {
    if (query.isError && query.error) {
      toast({
        title: query.error.name,
        description: query.error.message,
      })
    }
  }, [query.isError, query.error])

  return {
    ...query,
  }
}

export { useTokensRequest }
