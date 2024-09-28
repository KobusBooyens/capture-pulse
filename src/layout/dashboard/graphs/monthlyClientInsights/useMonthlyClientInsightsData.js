import dayjs from "dayjs";

const useMonthlyClientInsightsData = (data) => {
    const currentMonth = dayjs().month();
    const labels = [];
    const defaultValues = new Array(data?.length).fill(0);

    for (let i = 0; i < data?.length; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        labels.unshift(dayjs().month(monthIndex).format("MMM"));
    }

    data?.forEach(({ monthNumber, totalCount }) => {
        if (monthNumber >= currentMonth - data?.length - 1 && monthNumber <= currentMonth + 1) {
            const index = (currentMonth - monthNumber + data?.length ) % data?.length;
            defaultValues[index] = totalCount;
        }
    });

    return {
        labels: labels,
        datasets: { label: "Joined", data: defaultValues },
    };
};

export default useMonthlyClientInsightsData;
