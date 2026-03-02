export const countDayInMonth = (year: number, month: number, targetDay: number): number => {
    let count = 0;
    const date = new Date(year, month, 1); // month is 0-based

    while (date.getMonth() === month) {
        if (date.getDay() === targetDay) {
            count++;
        }
        date.setDate(date.getDate() + 1);
    }

    return count;
}
