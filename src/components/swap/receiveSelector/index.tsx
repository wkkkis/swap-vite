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

// Store
import { IToken, useTokensStore } from '@/store/token.store'

const ReceiveSelector = () => {
  const {
    receiveAmount,
    setReceiveInput,
    setFromInput,

    selectedReceiveToken,
    setSelectedReceiveToken,
  } = useTokensStore()

  const [amountValue, setAmountValue] = useState('')

  const debouncedValue = useDebounce(amountValue)
  const { data } = useSwap(debouncedValue)

  const ref = useRef(null)

  useEffect(() => {
    if (data) {
      setReceiveInput(String(data.output_amount))
      setFromInput(String(data.input_amount))
    }
  }, [data, setReceiveInput, setFromInput])

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
