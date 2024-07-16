import { FC } from 'react'

// Interface
import { IToken } from '@/store/token.store'

interface TokenItemProps {
  token: IToken
  onClick?: (data: IToken) => void
}

const TokenItem: FC<TokenItemProps> = ({ token, onClick }) => {
  const handleClick = () => {
    onClick && onClick(token)
  }

  return (
    <div
      key={token.id}
      className="flex items-center gap-2 cursor-pointer border rounded-lg p-[10px]"
      onClick={handleClick}
    >
      <img
        src={token.image}
        className="w-[35px] h-[35px] rounded-full"
        alt={token.name}
      />

      <span className="font-[500]">{token.name}</span>
    </div>
  )
}

export { TokenItem }
