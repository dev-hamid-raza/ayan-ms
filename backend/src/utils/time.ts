
export const toPKTDate = (date: Date | string): Date => {
    const d = new Date(date);
    const shifted = new Date(d);
    shifted.setHours(shifted.getHours() + 5);
    return shifted;
};

export const getMinutesFromDate = (date: Date): number => {
    return date.getHours() * 60 + date.getMinutes();
};

// Convert "09:15" -> 555
export const timeStringToMinutes = (timeStr: string): number => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
};

// Convert 555 -> "09:15"
export const minutesToTimeString = (minutes: number): string => {
    const h = Math.floor(minutes / 60).toString().padStart(2, "0");
    const m = (minutes % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
};

// Calculate total working hours
export const calculateHours = (start: number, end: number): number => {
    return (end - start) / 60;
};
