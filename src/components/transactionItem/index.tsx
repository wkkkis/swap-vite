import { FC } from 'react'

// Stores
import { ITransaction } from '@/store/transaction.store'

// Components
import { TokenItem } from '@/components/tokenItem'

interface TransactionItemProps {
  transation: ITransaction
}

const TransactionItem: FC<TransactionItemProps> = ({
  transation,
}) => {
  return (
    <div className="border-b flex flex-col gap-2 pb-[10px]">
      <TokenItem token={transation.fromToken} />
      <div className="flex items-center gap-1">
        <span className="text-[13px]">Spend:</span>
        <span className="text-[14px] font-[500]">
          {transation.fromAmount}
        </span>
      </div>

      <TokenItem token={transation.receiveToken} />
      <div className="flex items-center gap-1">
        <span className="text-[13px]">Get:</span>
        <span className="text-[14px] font-[500]">
          {transation.receiveAmount}
        </span>
      </div>
    </div>
  )
}

export { TransactionItem }
