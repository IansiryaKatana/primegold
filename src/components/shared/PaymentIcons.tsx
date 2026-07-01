import { cn } from '@/lib/utils'

const paymentMarks = [
  { name: 'Visa', src: '/payments/visa.svg' },
  { name: 'Mastercard', src: '/payments/mastercard.svg' },
  { name: 'American Express', src: '/payments/amex.svg' },
  { name: 'PayPal', src: '/payments/paypal.svg' },
] as const

/** Compact payment marks for footer / checkout trust strip */
export function PaymentMethods({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {paymentMarks.map((mark) => (
        <span
          key={mark.name}
          className="flex h-8 items-center rounded-sm bg-white px-2.5"
        >
          <img
            src={mark.src}
            alt={mark.name}
            className="h-5 w-auto max-w-[56px] object-contain"
          />
        </span>
      ))}
    </div>
  )
}
