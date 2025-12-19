// ../common/UserPermissionCard.tsx
import * as React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ACTIONS, MODULES } from "@/types/auth.types"

const ACTION_LIST: { key: ACTIONS; label: string }[] = [
    { key: ACTIONS.READ, label: "Read" },
    { key: ACTIONS.CREATE, label: "Create" },
    { key: ACTIONS.UPDATE, label: "Update" },
    { key: ACTIONS.DELETE, label: "Delete" },
]

type Props = {
    module: MODULES
    title: string
    value: ACTIONS[]
    onChange: (next: ACTIONS[]) => void
}

export function PermissionCard({ module, title, value, onChange }: Props) {
    const isChecked = (action: ACTIONS) => value.includes(action)

    const setChecked = (action: ACTIONS, checked: boolean) => {
        if (checked) {
            // add (no duplicates)
            onChange(Array.from(new Set([...value, action])))
        } else {
            // remove
            onChange(value.filter((a) => a !== action))
        }
    }

    return (
        <div
            className="
        hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3
        has-[button[data-state=checked]]:border-blue-600
        has-[button[data-state=checked]]:bg-blue-50
        dark:has-[button[data-state=checked]]:border-blue-900
        dark:has-[button[data-state=checked]]:bg-blue-950
      "
        >
            <div className="grid gap-2 w-full">
                <Label className="text-sm leading-none font-medium cursor-default">
                    {title}
                </Label>

                <div className="flex justify-between">
                    {ACTION_LIST.map(({ key, label }) => {
                        const id = `${module}-${key}`

                        return (
                            <div key={key} className="flex flex-col justify-center items-center gap-1">
                                <label htmlFor={id} className="text-xs">
                                    {label}
                                </label>

                                <Switch
                                    id={id}
                                    checked={isChecked(key)}
                                    onCheckedChange={(checked) => setChecked(key, checked)}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
