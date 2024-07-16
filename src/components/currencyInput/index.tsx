import { ChangeEvent, forwardRef } from 'react'

// Components
import { Input } from '@/components/ui/input'

interface CurrencyInputProps {
  value: string
  onAmountChange: (value: string) => void
}

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

type Props = CurrencyInputProps & InputProps

const CurrencyInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onAmountChange, ...props }, ref) => {
    const handleChange = (
      e: ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value

      if (/^\d*$/.test(value)) {
        if (value === '') {
          onAmountChange('0')
        } else if (value === '0') {
          onAmountChange(value)
        } else {
          onAmountChange(value.replace(/^0+/, ''))
        }
      }
    }

    return (
      <Input
        ref={ref}
        value={value}
        onChange={handleChange}
        className="font-[500]"
        {...props}
      />
    )
  }
)

export { CurrencyInput }
