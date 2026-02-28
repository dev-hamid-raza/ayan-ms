import { ColumnDef } from "@tanstack/react-table"
import { AuditLog, JsonValue } from "@/types/auditLogs.types"
import { ActionBadge } from "../auditLogs/action-badge"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverHeader,
    PopoverTitle,
} from "@/components/ui/popover"

export const auditColumns: ColumnDef<AuditLog>[] = [
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
            <ActionBadge action={row.original.action} />
        ),
    },
    {
        accessorKey: "modelName",
        header: "Model",
    },
    {
        header: "User",
        cell: ({ row }) => row.original.performedBy.userName,
    },
    {
        accessorKey: "timestamp",
        header: "Time",
        cell: ({ row }) =>
            new Date(row.original.timestamp).toLocaleString("en-PK", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            }),
    },
    {
        header: "Changes",
        cell: ({ row }) =>
            `${row.original.changes.length} field(s)`,
    },
    {
        id: "view",
        header: "",
        cell: ({ row }) => {
            const log = row.original

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">
                            View
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        align="end"
                        className="w-[420px] max-h-[500px] overflow-y-auto"
                    >
                        <PopoverHeader>
                            <PopoverTitle>
                                {log.action} — {log.modelName}
                            </PopoverTitle>
                            <div className="text-xs text-muted-foreground">
                                {log.performedBy.userName} •{" "}
                                {new Date(log.timestamp).toLocaleString()}
                            </div>
                        </PopoverHeader>

                        {log.action === "DELETE" && (
                            <div className="text-destructive font-medium mt-2">
                                This document was deleted.
                            </div>
                        )}

                        <div className="space-y-3 mt-2">
                            {log.changes.map((change, index) => (
                                <div
                                    key={index}
                                    className="border rounded-md p-2 text-xs space-y-2"
                                >
                                    <div className="font-semibold">
                                        {change.field}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <div className="text-muted-foreground text-[10px]">
                                                Before
                                            </div>
                                            <div>
                                                {formatValue(change.oldValue)}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-muted-foreground text-[10px]">
                                                After
                                            </div>
                                            <div>
                                                {formatValue(change.newValue)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-[10px] text-muted-foreground mt-3">
                            Document ID: {log.documentId}
                        </div>
                    </PopoverContent>
                </Popover>
            )
        },
    },
]

function formatValue(value: JsonValue): React.ReactNode {
    if (value === null || value === undefined) return "—"

    // Array case
    if (Array.isArray(value)) {
        return (
            <div className="space-y-1">
                {value.map((item, i) => (
                    <div
                        key={i}
                        className="bg-muted p-1 rounded text-[10px]"
                    >
                        {typeof item === "object" && item !== null ? (
                            Object.entries(item).map(([k, v]) => (
                                <div key={k}>
                                    <span className="font-medium">{k}:</span>{" "}
                                    {String(v)}
                                </div>
                            ))
                        ) : (
                            <span>{String(item)}</span>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    // Object case
    if (typeof value === "object") {
        return (
            <div className="bg-muted p-1 rounded text-[10px]">
                {Object.entries(value).map(([k, v]) => (
                    <div key={k}>
                        <span className="font-medium">{k}:</span>{" "}
                        {String(v)}
                    </div>
                ))}
            </div>
        )
    }

    // Primitive case
    return value.toString()
}