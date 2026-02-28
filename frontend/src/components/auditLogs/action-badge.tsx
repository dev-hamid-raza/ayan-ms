import { Badge } from "@/components/ui/badge"

export function ActionBadge({ action }: { action: string }) {
    const variant =
        action === "CREATE"
            ? "default"
            : action === "UPDATE"
                ? "secondary"
                : "destructive"

    return <Badge variant={variant}>{action}</Badge>
}