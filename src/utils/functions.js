import dayjs from "dayjs";

export function getWeekOfMonth() {
    const currentDate = dayjs();
    const startOfMonth = currentDate.startOf("month");
    return Math.ceil((currentDate.date() + startOfMonth.day()) / 7);
}

