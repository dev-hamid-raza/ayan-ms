import { ColumnDef } from "@tanstack/react-table"
import { LogRow } from "@/types/errorLogs.types"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Eye } from "lucide-react"
import PrimaryTooltip from "../common/PrimaryTooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

export const logColumns: ColumnDef<LogRow>[] = [
    { accessorKey: "level", header: "Level" },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => new Date(row.original.time).toLocaleString(),
    },
    { accessorKey: "pid", header: "PID" },
    { accessorKey: "hostname", header: "Hostname" },
    { accessorKey: "method", header: "Method" },
    { accessorKey: "url", header: "URL" },
    { accessorKey: "text", header: "Message" },
    {
        accessorKey: "stack",
        header: "Stack",
        cell: ({ row }) => {
            const stack = row.original.stack

            if (!stack) return <span className="text-muted-foreground">-</span>

            return (
                <Popover>
                    <PrimaryTooltip content="View">
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                                <Eye />
                            </Button>
                        </PopoverTrigger>
                    </PrimaryTooltip>

                    <PopoverContent align="end" sideOffset={8} className="w-[520px] p-3">
                        <PopoverHeader>
                            <PopoverTitle>Stack Trace</PopoverTitle>
                        </PopoverHeader>

                        <ScrollArea className="h-[320px] overflow-auto rounded-sm border bg-muted p-2">
                            <pre className="h-full text-xs whitespace-pre-wrap break-all">
                                {stack}
                            </pre>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            )
        },
    },
]