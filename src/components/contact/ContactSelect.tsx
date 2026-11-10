import { forwardRef } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FormOption } from '@/content/form-options'
import { cn } from '@/lib/utils'

type ContactSelectProps = {
  id: string
  value: string
  placeholder: string
  options: FormOption[]
  disabled?: boolean
  invalid?: boolean
  labelledBy?: string
  describedBy?: string
  onChange: (value: string) => void
  onBlur: () => void
}

export const ContactSelect = forwardRef<HTMLButtonElement, ContactSelectProps>(
  function ContactSelect(
    {
      id,
      value,
      placeholder,
      options,
      disabled,
      invalid,
      labelledBy,
      describedBy,
      onChange,
      onBlur,
    },
    ref,
  ) {
    return (
      <Select
        value={value || undefined}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger
          ref={ref}
          id={id}
          aria-labelledby={labelledBy}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onBlur={onBlur}
          className={cn(
            'inp h-auto min-h-[52px] justify-between rounded-none px-4 text-[15px] font-normal text-navy shadow-none',
            'focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-brand focus:ring-0 focus:ring-offset-0',
            'data-[placeholder]:text-muted [&>span]:line-clamp-1',
            invalid && 'border-[#dc2626]',
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="z-[80] max-h-72 rounded-none border-line bg-white text-navy shadow-[0_8px_24px_rgba(12,28,52,0.12)]"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer rounded-none py-3 pl-8 pr-3 text-[15px] focus:bg-tint focus:text-navy"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
)
