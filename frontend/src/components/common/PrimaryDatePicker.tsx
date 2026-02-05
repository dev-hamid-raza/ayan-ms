"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export function DatePickerInput({ date, onDateChange }: { date?: Date; onDateChange?: (date: Date) => void }) {
    const [open, setOpen] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)
    const [month, setMonth] = React.useState<Date | undefined>(selectedDate)

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date)
        if (date && onDateChange) {
            onDateChange(date)
        }
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type='button'
                    className='px-3 py-2 border border-input rounded-md hover:bg-accent'
                    aria-label="Select date"
                >
                    <CalendarIcon className='w-5 h-5' />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="end"
                sideOffset={10}
            >
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={handleDateSelect}
                />
            </PopoverContent>
        </Popover>
    )
}
