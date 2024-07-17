import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

// Store
import { IToken, useTokensStore } from '@/store/token.store'
import { useQuoteStore } from '@/store/quote.store'

// Hooks
import { useDebounce } from '@/hooks/useDebounce'

// Components
import { CurrencyInput } from '@/components/currencyInput'
import { TokenSelectModal } from '@/components/swap/tokenSelectModal'

const ReceiveSelector = () => {
  const { setQuoteData } = useQuoteStore()
  const {
    receiveAmount,
    setReceiveInput,

    selectedReceiveToken,
    setSelectedReceiveToken,
  } = useTokensStore()

  const [amountValue, setAmountValue] = useState('')

  const ref = useRef(null)
  const debouncedValue = useDebounce(amountValue)

  useEffect(() => {
    if (debouncedValue) {
      setQuoteData({
        type: 'output_amount',
        amount: debouncedValue
      })
    }
  }, [debouncedValue, setQuoteData])

  const onTokenSelect = useCallback(
    (token: IToken) => {
      setSelectedReceiveToken(token)
    },
    [setSelectedReceiveToken]
  )

  const onAmountChange = useCallback(
    (val: string) => {
      setReceiveInput(val)
      setAmountValue(val)
    },
    [setReceiveInput, setAmountValue]
  )

  return (
    <div className="flex flex-row-reverse gap-2">
      <TokenSelectModal
        value={selectedReceiveToken}
        onClick={onTokenSelect}
      />

      {selectedReceiveToken && (
        <CurrencyInput
          ref={ref}
          value={receiveAmount}
          onAmountChange={onAmountChange}
        />
      )}
    </div>
  )
}

export { ReceiveSelector }
