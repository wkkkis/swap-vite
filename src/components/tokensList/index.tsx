import { FC } from 'react'

// Store
import { IToken } from '@/store/token.store'

// Components
import { TokenItem } from '@/components/tokenItem'

interface TokensContainerProps {
  handleClick: (data: IToken) => void
  tokens: null | IToken[]
}

const TokensList: FC<TokensContainerProps> = ({
  tokens,
  handleClick,
}) => {
  if (!tokens?.length) {
    return <span>Not found</span>
  }

  return tokens?.map((token) => (
    <TokenItem
      key={token.id}
      token={token}
      onClick={handleClick}
    />
  ))
}

export { TokensList }
