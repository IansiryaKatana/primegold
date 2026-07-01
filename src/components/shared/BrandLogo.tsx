import { brand } from '@/data/copy'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <img
      src="/logo.png"
      alt={brand.name}
      width={320}
      height={48}
      className={cn('h-10 w-auto max-w-full object-contain', className)}
    />
  )
}
