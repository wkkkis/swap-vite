import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

// Hooks
import { useDebounce } from '@/hooks/useDebounce'
import { useSwap } from '@/hooks/useSwap'

// Components
import { CurrencyInput } from '@/components/currencyInput'
import { TokenSelectModal } from '@/components/swap/tokenSelectModal'

//Store
import { useTokensStore, IToken } from '@/store/token.store'

const FromSelector = () => {
  const {
    fromAmount,
    setFromInput,
    setReceiveInput,

    selectedFromToken,
    setSelectedFromToken,
  } = useTokensStore()

  const [amountValue, setAmountValue] = useState('')

  const debouncedValue = useDebounce(amountValue)
  const { data } = useSwap(debouncedValue)

  const ref = useRef(null)

  useEffect(() => {
    if (data) {
      setFromInput(String(data.output_amount))
      setReceiveInput(String(data.input_amount))
    }
  }, [data, setFromInput, setReceiveInput])

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
