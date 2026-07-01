import { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import type { Branch } from '@/lib/types'
import { branches as defaultBranches } from '@/data/content'
import { cn } from '@/lib/utils'
import 'leaflet/dist/leaflet.css'

const branchIcon = L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;background:#003d2b;border:2px solid #d6a43b;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.25);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const highlightIcon = L.divIcon({
  className: '',
  html: `<div style="width:18px;height:18px;background:#d6a43b;border:2px solid #003d2b;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

type BranchMapClientProps = {
  highlightedBranches?: Branch[]
  className?: string
}

export function BranchMapClient({
  highlightedBranches = defaultBranches,
  className,
}: BranchMapClientProps) {
  const displayBranches = highlightedBranches.length
    ? highlightedBranches
    : defaultBranches

  const center = useMemo(() => {
    const lat =
      displayBranches.reduce((sum, b) => sum + b.latitude, 0) /
      displayBranches.length
    const lng =
      displayBranches.reduce((sum, b) => sum + b.longitude, 0) /
      displayBranches.length
    return [lat, lng] as [number, number]
  }, [displayBranches])

  const highlightedIds = new Set(displayBranches.map((b) => b.id))

  return (
    <div
      className={cn(
        'branch-map relative z-0 isolate min-h-[240px] flex-1 overflow-hidden rounded-sm border border-warm-border',
        className,
      )}
    >
      <MapContainer
        center={center}
        zoom={4}
        scrollWheelZoom={false}
        className="size-full min-h-[240px]"
        style={{ height: '100%', minHeight: 240 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {defaultBranches.map((branch) => (
          <Marker
            key={branch.id}
            position={[branch.latitude, branch.longitude]}
            icon={highlightedIds.has(branch.id) ? highlightIcon : branchIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="text-primary-text">{branch.name}</p>
                <p className="text-muted-text">
                  {branch.city}, {branch.state}
                </p>
                <p className="text-muted-text">{branch.phone}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
