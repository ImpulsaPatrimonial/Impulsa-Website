import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { contactCopy } from '@/content/contact'

type ContactSuccessProps = {
  onReset: () => void
}

export function ContactSuccess({ onReset }: ContactSuccessProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.focus()
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <span
        aria-hidden="true"
        className="flex size-14 items-center justify-center rounded-full bg-navy text-2xl text-white"
      >
        ✓
      </span>
      <h2
        ref={titleRef}
        tabIndex={-1}
        className="outline-none text-[32px] leading-[1.2]"
      >
        {contactCopy.successTitle}
      </h2>
      <span className="max-w-[420px]">{contactCopy.successText}</span>
      <Button type="button" variant="outline" onClick={onReset}>
        {contactCopy.successReset}
      </Button>
    </div>
  )
}
