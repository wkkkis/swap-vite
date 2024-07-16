import { BrowserRouter } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Pages
import { Router } from '@/pages'

// Components
import { Toaster } from '@/components/ui/toaster'

// Styles
import './styles/global.scss'

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export { App }
