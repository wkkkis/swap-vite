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
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      let val = event.target.value;
  
      if (val === '') {
        onAmountChange('0');
        return;
      }
  
      if (!isNaN(Number(val)) || val === '.') {
        if (val.startsWith('0') && val.length > 1 && val[1] !== '.') {
          val = val.slice(1);
        }
        onAmountChange(val);
      }
    };
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
