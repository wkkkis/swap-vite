import { FC, useState } from 'react'
import { useIsFetching } from '@tanstack/react-query'

// Components
import { TokensList } from '@/components/tokensList'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Store
import { IToken, useTokensStore } from '@/store/token.store'

// Utils
import {
  DEFAULT_SELECTED_FROM_TOKEN,
  NATIVE_ADDRESSES,
} from '@/utils/constants'
import { cn } from '@/lib/utils'

interface TokenSelectModalProps {
  onClick: (data: IToken) => void
  value?: IToken | null
}

const TokenSelectModal: FC<TokenSelectModalProps> = ({
  value,
  onClick,
}) => {
  const { tokens } = useTokensStore()

  const [isOpen, setIsOpen] = useState(false)

  const isFetching = useIsFetching()

  const handleClick = (data: IToken) => {
    if (NATIVE_ADDRESSES.includes(data.name)) {
      onClick(DEFAULT_SELECTED_FROM_TOKEN)
    } else {
      onClick(data)
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={cn(!value?.name && 'w-full')}>
        {value?.name ? (
          <Badge
            variant="default"
            className="h-full w-[80px] flex justify-center"
          >
            {value.name.toUpperCase()}
          </Badge>
        ) : (
          <div className="w-full h-[40px] bg-stone-200 rounded-lg flex items-center justify-center">
            <span className="font-[500]">
              Please select a token
            </span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent
        className={cn(
          'max-h-[80vh] overflow-y-scroll transition duration-300',
          isFetching && 'blur(3px)'
        )}
      >
        <DialogHeader>
          <DialogTitle>Swap tokens</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <TokensList
          tokens={tokens}
          handleClick={handleClick}
        />
      </DialogContent>
    </Dialog>
  )
}

export { TokenSelectModal }
