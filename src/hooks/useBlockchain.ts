import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

// Api
import { ApiService } from '@/api/api.service'

// Store
import { useBlockchainStore } from '@/store/blockchain.store'

// Components
import { useToast } from '@/components/ui/use-toast'

export const useBlockchainRequest = () => {
  const {
    blockchains,
    setBlockchains,
    setSelectedBlockchain,
  } = useBlockchainStore()

  const { toast } = useToast()

  const query = useQuery({
    queryKey: ['blockchain'],
    queryFn: () => ApiService.getBlockchains(),
    select: (res) => res.data,
    enabled: !blockchains?.length,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (query.isSuccess && query.data?.length) {
      setBlockchains(query.data)
      setSelectedBlockchain(query.data[0])
    }
  }, [
    query.isSuccess, query.data
  ])

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
