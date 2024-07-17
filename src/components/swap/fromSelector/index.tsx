import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

//Store
import { useTokensStore, IToken } from '@/store/token.store'
import { useQuoteStore } from '@/store/quote.store'

// Hooks
import { useDebounce } from '@/hooks/useDebounce'

// Components
import { CurrencyInput } from '@/components/currencyInput'
import { TokenSelectModal } from '@/components/swap/tokenSelectModal'

const FromSelector = () => {
  const {
    fromAmount,
    setFromInput,

    selectedFromToken,
    setSelectedFromToken,
  } = useTokensStore()
  const { setQuoteData } = useQuoteStore()

  const [amountValue, setAmountValue] = useState('')

  const ref = useRef(null)
  const debouncedValue = useDebounce(amountValue)

  useEffect(() => {
    if (debouncedValue) {
      setQuoteData({
        type: 'input_amount',
        amount: debouncedValue
      })
    }
  }, [debouncedValue])

  const onTokenSelect = useCallback(
    (token: IToken) => {
      setSelectedFromToken(token)
    },
    [setSelectedFromToken]
  )

  const onAmountChange = useCallback(
    (val: string) => {
      setFromInput(val)
      setAmountValue(val)
    },
    [setFromInput, setAmountValue]
  )

  return (
    <div className="flex flex-row-reverse gap-2">
      <TokenSelectModal
        value={selectedFromToken}
        onClick={onTokenSelect}
      />
      {selectedFromToken && (
        <CurrencyInput
          ref={ref}
          value={fromAmount}
          onAmountChange={onAmountChange}
        />
      )}
    </div>
  )
}

export { FromSelector }
