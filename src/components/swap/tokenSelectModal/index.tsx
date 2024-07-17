import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useIsFetching } from '@tanstack/react-query'

// Store
import { IToken, useTokensStore } from '@/store/token.store'

// Hooks
import { useDebounce } from '@/hooks/useDebounce'

// Components
import { TokensList } from '@/components/tokensList'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Utils
import { cn } from '@/lib/utils'
import {
  DEFAULT_SELECTED_FROM_TOKEN,
  TON_NATIVE,
} from '@/utils/constants'

interface TokenSelectModalProps {
  onClick: (data: IToken) => void
  value?: IToken | null
}

const TokenSelectModal: FC<TokenSelectModalProps> = ({
  value,
  onClick,
}) => {
  const { tokens } = useTokensStore()

  const [tokensBySearch, setTokensBySearch] = useState<null | IToken[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchVal, setSearchVal] = useState<string>('')

  const isFetching = useIsFetching()
  const searchDebounce = useDebounce(searchVal)

  useEffect(() => {
    if (searchDebounce && tokens) {
      const filteredTokens = tokens?.filter((token) => {
        const name = token.name.toLowerCase()
        return name?.includes(searchDebounce.toLowerCase())
      })
      setTokensBySearch(filteredTokens)
    } else {
      setTokensBySearch(tokens)
    }
  }, [tokens, searchDebounce])

  const handleClick = (data: IToken) => {
    if (TON_NATIVE === data.name.toLowerCase()) {
      onClick(DEFAULT_SELECTED_FROM_TOKEN)
    } else {
      onClick(data)
    }
    setIsOpen(false)
  }

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
  }, [setSearchVal])

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
          <DialogDescription>
            <Input value={searchVal} placeholder='Search' onChange={handleSearch} />
          </DialogDescription>
        </DialogHeader>

        <TokensList
          tokens={tokensBySearch}
          handleClick={handleClick}
        />
      </DialogContent>
    </Dialog>
  )
}

export { TokenSelectModal }
