export function formatDate(timestamp: number | string): string {
    const date = new Date(Number(timestamp));
    if (isNaN(date.getTime())) return "Invalid Date";

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
    
    return date.toLocaleDateString("en-US", options)
}