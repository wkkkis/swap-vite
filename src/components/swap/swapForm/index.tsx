// Stores
import { useTransactionsStore } from '@/store/transaction.store'
import { useTokensStore } from '@/store/token.store'

// Hooks
import { useBlockchainRequest } from '@/hooks/useBlockchain'
import { useTokensRequest } from '@/hooks/useTokens'
import { useSwap } from '@/hooks/useSwap'

// Components
import { FromSelector } from '@/components/swap/fromSelector'
import { ReceiveSelector } from '@/components/swap/receiveSelector'
import { ReverseTokens } from '@/components/swap/reverseTokens'

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const SwapForm = () => {
  const { setTransactions } = useTransactionsStore()
  const {
    fromAmount,
    selectedFromToken,

    receiveAmount,
    selectedReceiveToken,
  } = useTokensStore()

  useBlockchainRequest()
  useTokensRequest()
  useSwap()

  const { toast } = useToast()

  const checkTokens = !!(
    selectedReceiveToken && selectedFromToken
  )
  const checkAmounts = !!(
    Number(fromAmount) && Number(receiveAmount)
  )
  const disableBtn = !(checkTokens && checkAmounts)

  const onSubmit = () => {
    if (checkTokens && checkAmounts) {
      setTransactions({
        fromAmount,
        fromToken: selectedFromToken,
        receiveAmount,
        receiveToken: selectedReceiveToken,
      })
      toast({
        title: 'Transaction successfyly created',
      })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <FromSelector />
      <ReverseTokens />
      <ReceiveSelector />
      <Separator className="my-4" />
      <div className="w-full">
        <Button
          className="w-full"
          onClick={onSubmit}
          disabled={disableBtn}
        >
          SWAP
        </Button>
      </div>
    </div>
  )
}

export { SwapForm }
