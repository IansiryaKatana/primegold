import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-4',
        month_caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-base',
        nav: 'flex items-center gap-1',
        button_previous:
          'absolute left-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-sm',
        button_next:
          'absolute right-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-sm',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday:
          'text-muted-text rounded-sm w-8 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-cream [&:has([aria-selected].day-outside)]:bg-cream/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
        day_button:
          'size-8 p-0 font-normal aria-selected:opacity-100 hover:bg-cream rounded-sm',
        selected:
          'bg-emerald-deep text-white hover:bg-emerald-deep hover:text-white focus:bg-emerald-deep focus:text-white rounded-sm',
        today: 'bg-cream text-primary-text',
        outside:
          'day-outside text-muted-text aria-selected:text-muted-text',
        disabled: 'text-muted-text opacity-50',
        hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
