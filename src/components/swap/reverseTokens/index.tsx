import { useCallback, useEffect, useState } from 'react'

// Stores
import { useTokensStore } from '@/store/token.store'

// Components
import { Separator } from '@radix-ui/react-separator'

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

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const tokens = !!(
      selectedReceiveToken && selectedFromToken
    )
    if (tokens) {
      setSelectedFromToken(selectedReceiveToken)
      setSelectedReceiveToken(selectedFromToken)
    }
  }, [toggle, setSelectedFromToken, setSelectedReceiveToken])

  const onToggle = useCallback(() => {
    setToggle(!toggle)
  }, [setToggle, toggle])

  return (
    <div className="relative flex items-center justify-center">
      {!!selectedReceiveToken && (
        <div
          onClick={onToggle}
          className={cn(
            'w-[24px] h-[24px] flex items-center justify-center bg-stone-200 rounded-full absolute cursor-pointer transition duration-300',
            toggle && 'rotate-[180deg]'
          )}
        >
          <img src={reverseIcon} />
        </div>
      )}
      <Separator className="my-4" />
    </div>
  )
}

export { ReverseTokens }
