import { useCallback } from 'react'

// Stores
import { useTokensStore } from '@/store/token.store'

// Utils
import { cn } from '@/lib/utils'

// Icons
import reverseIcon from '@/assets/icons/reverseIcon.svg'

const ReverseTokens = () => {
  const {
    selectedFromToken,
    setSelectedFromToken,

    selectedReceiveToken,
    setSelectedReceiveToken,
  } = useTokensStore()

  const onToggle = useCallback(() => {
    const tokens = !!(
      selectedReceiveToken && selectedFromToken
    )
    if (tokens) {
      setSelectedFromToken(selectedReceiveToken)
      setSelectedReceiveToken(selectedFromToken)
    }
  }, [selectedReceiveToken, selectedFromToken])

  return (
    <div className="flex items-center justify-center">
      {!!selectedReceiveToken && (
        <div
          onClick={onToggle}
          className={cn(
            'w-[24px] h-[24px] flex items-center justify-center bg-stone-200 rounded-full cursor-pointer transition duration-300 hover:rotate-[180deg]'
          )}
        >
          <img src={reverseIcon} />
        </div>
      )}
    </div>
  )
}

export { ReverseTokens }
