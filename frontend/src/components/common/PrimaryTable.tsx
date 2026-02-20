"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function PrimaryTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border">
            {/* Desktop View */}
            <div className="hidden md:flex flex-col h-full">
                <div className="shrink-0 border-b bg-secondary">
                    <Table className="w-full">
                        <colgroup>
                            {table.getAllLeafColumns().map((column) => (
                                <col key={column.id} style={{ width: column.getSize() }} />
                            ))}
                        </colgroup>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="whitespace-nowrap">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                    </Table>
                </div>
                <ScrollArea className="min-h-0 flex-1">
                    <Table className="w-full">
                        <colgroup>
                            {table.getAllLeafColumns().map((column) => (
                                <col key={column.id} style={{ width: column.getSize() }} />
                            ))}
                        </colgroup>
                        <TableBody className="[&_tr:last-child]:border-b">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="whitespace-normal">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>

            {/* Mobile View - Card Layout */}
            <div className="md:hidden flex flex-col h-full overflow-auto">
                {table.getRowModel().rows?.length ? (
                    <div className="p-4 space-y-4">
                        {table.getRowModel().rows.map((row) => (
                            <div
                                key={row.id}
                                className="border rounded-lg p-4 bg-white space-y-3"
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const header = cell.column.columnDef.header;
                                    const headerText = typeof header === 'string' ? header : cell.column.id;
                                    
                                    return (
                                        <div key={cell.id} className="flex justify-between items-start gap-2">
                                            <span className="font-semibold text-sm text-muted-foreground min-w-fit">
                                                {headerText}:
                                            </span>
                                            <span className="text-sm text-right flex-1">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-24 flex items-center justify-center text-center text-muted-foreground">
                        No results.
                    </div>
                )}
            </div>
        </div>
    )
}