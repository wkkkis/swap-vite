// Stores
import { useTransactionsStore } from '@/store/transaction.store'

// Components
import { TransactionItem } from '@/components/transactionItem'

const TransactionsList = () => {
  const { transactions } = useTransactionsStore()

  if (!transactions?.length) {
    return <span>Not found</span>
  }

  return (
    <div className="flex flex-col gap-2">
      {transactions?.map((t) => (
        <TransactionItem transation={t} />
      ))}
    </div>
  )
}

export { TransactionsList }
