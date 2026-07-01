import { useEffect, useState, type ComponentType } from 'react'
import type { Branch } from '@/lib/types'
import { branches as allBranches } from '@/data/content'
import { cn } from '@/lib/utils'

type BranchMapProps = {
  highlightedBranches?: Branch[]
  className?: string
}

export function BranchMap({ highlightedBranches, className }: BranchMapProps) {
  const [MapView, setMapView] = useState<ComponentType<{
    highlightedBranches?: Branch[]
    className?: string
  }> | null>(null)

  useEffect(() => {
    import('@/components/home/BranchMapClient').then((mod) => {
      setMapView(() => mod.BranchMapClient)
    })
  }, [])

  if (!MapView) {
    return (
      <div
        className={cn(
          'min-h-[240px] flex-1 rounded-sm bg-cream',
          className,
        )}
      />
    )
  }

  return (
    <MapView
      highlightedBranches={highlightedBranches ?? allBranches}
      className={className}
    />
  )
}
