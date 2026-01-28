/**
 * Converts SCREAMING_SNAKE_CASE to Title Case
 * @example "GATE_PASS_IN" -> "Gate Pass In"
 */
export const formatModuleName = (moduleName: string): string => {
    if (!moduleName) return ""
    
    return moduleName
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
}
