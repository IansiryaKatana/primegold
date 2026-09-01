'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { CalendarIcon, MapPin } from 'lucide-react'
import { z } from 'zod'
import { createAppointment, getNearestBranches } from '@/server/functions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { homeCopy } from '@/data/copy'
import { MotionSection, StaggerGrid } from '@/components/motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Container, SectionHeading } from '@/components/shared/primitives'
import { cn } from '@/lib/utils'
import type { Branch } from '@/lib/types'
import { BranchMap } from '@/components/home/BranchMap'

const appointmentSchema = z.object({
  serviceType: z.string().min(1, 'Select a service'),
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone required'),
  preferredDate: z.date({ required_error: 'Date required' }),
  preferredTime: z.string().min(1, 'Time required'),
  address: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

function LocationFinderCard() {
  const [branches, setBranches] = useState<(Branch & { distance: number })[]>(
    [],
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function findNearest() {
    setLoading(true)
    setError('')
    try {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.')
        return
      }
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject),
      )
      const results = await getNearestBranches({
        data: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      })
      setBranches(results)
    } catch {
      setError('Unable to get your location. Please enable location access.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="flex h-full min-h-0 flex-col md:min-h-[480px] lg:min-h-[540px]">
      <CardHeader className="shrink-0">
        <CardTitle>Find a Location Near You</CardTitle>
        <p className="text-desc">
          100+ branches across the U.S. Find a Prime Gold Trading location near
          you.
        </p>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
        <BranchMap
          highlightedBranches={branches}
          className="min-h-[280px] flex-1"
        />
        <Button
          variant="emerald"
          onClick={findNearest}
          disabled={loading}
          className="w-full shrink-0"
        >
          <MapPin />
          {loading ? 'Finding...' : 'Find My Nearest Branch'}
        </Button>
        {error && <p className="shrink-0 text-xs text-red-600">{error}</p>}
        {branches.length > 0 && (
          <div className="flex max-h-40 shrink-0 flex-col gap-2 overflow-y-auto">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="rounded-sm border border-warm-border p-3 text-base"
              >
                <p className="text-primary-text">{branch.name}</p>
                <p className="text-muted-text">
                  {branch.city}, {branch.state} · {branch.distance} mi
                </p>
                <p className="text-xs text-muted-text">{branch.phone}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [mode, setMode] = useState<'in_branch' | 'at_home'>('in_branch')
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  })

  const preferredDate = watch('preferredDate')

  async function onSubmit(data: AppointmentFormData) {
    await createAppointment({
      data: {
        ...data,
        mode,
        preferredDate: data.preferredDate.toISOString(),
      },
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="flex h-full items-center justify-center">
        <CardContent className="py-12 text-center">
          <p className="text-xl text-emerald-deep md:text-2xl">
            Appointment Request Received!
          </p>
          <p className="mt-2 text-desc">
            We will contact you shortly to confirm your appointment.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex h-full min-h-0 flex-col md:min-h-[480px] lg:min-h-[540px]">
      <CardHeader>
        <CardTitle>Book Your Appointment Today</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as 'in_branch' | 'at_home')}
          className="flex w-full flex-col"
        >
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="in_branch">In Branch</TabsTrigger>
            <TabsTrigger value="at_home">At Home</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <TabsContent value="in_branch" className="mt-0">
              <p className="rounded-sm border border-warm-border bg-cream/50 px-3 py-2.5 text-sm text-muted-text">
                Visit any Prime Gold branch for your appointment. We will confirm your nearest location by email.
              </p>
            </TabsContent>

            <TabsContent value="at_home" className="mt-0">
              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Home Address</Label>
                <Input
                  id="address"
                  placeholder="Street, city, state, ZIP"
                  {...register('address')}
                />
              </div>
            </TabsContent>

          <div className="flex flex-col gap-2">
            <Label>Service Type</Label>
            <Select onValueChange={(v) => setValue('serviceType', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sell_gold">Sell Gold</SelectItem>
                <SelectItem value="sell_jewelry">Sell Jewelry</SelectItem>
                <SelectItem value="buy_gold">Buy Gold</SelectItem>
                <SelectItem value="buy_silver">Buy Silver</SelectItem>
                <SelectItem value="coins">Coins</SelectItem>
              </SelectContent>
            </Select>
            {errors.serviceType && (
              <p className="text-xs text-red-600">{errors.serviceType.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="text-xs text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="text-xs text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start font-normal',
                      !preferredDate && 'text-muted-text',
                    )}
                  >
                    <CalendarIcon />
                    {preferredDate
                      ? format(preferredDate, 'PPP')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={preferredDate}
                    onSelect={(date) =>
                      date && setValue('preferredDate', date)
                    }
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {errors.preferredDate && (
                <p className="text-xs text-red-600">
                  {errors.preferredDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Preferred Time</Label>
              <Select onValueChange={(v) => setValue('preferredTime', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                  <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                  <SelectItem value="4:30 PM">4:30 PM</SelectItem>
                </SelectContent>
              </Select>
              {errors.preferredTime && (
                <p className="text-xs text-red-600">
                  {errors.preferredTime.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" variant="emerald" disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </Button>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function LocationAppointmentSection() {
  const copy = homeCopy.locations
  return (
    <MotionSection id="locations" tier="b" className="bg-cream py-16 md:py-20">
      <Container>
        <SectionHeading title={copy.title} subtitle={copy.subtitle} />
        <StaggerGrid className="grid items-stretch gap-8 md:grid-cols-2" stagger={0.12}>
          <LocationFinderCard />
          <AppointmentForm />
        </StaggerGrid>
      </Container>
    </MotionSection>
  )
}
