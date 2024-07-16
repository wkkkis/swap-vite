// Components
import { SwapForm } from '@/components/swap/swapForm'
import { TransactionsList } from '@/components/transactionsList'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const Main = () => {
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center gap-4">
      <Card className="max-w-[400px] h-[500px] w-full transition duration-300">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-scroll">
          <TransactionsList />
        </CardContent>
      </Card>
      <Card className="max-w-[400px] min-h-[300px] w-full transition duration-300">
        <CardHeader>
          <CardTitle>SWAP</CardTitle>
        </CardHeader>
        <CardContent>
          <SwapForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Main
