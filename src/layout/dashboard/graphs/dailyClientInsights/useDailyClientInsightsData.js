const useDailyClientInsightsData = (data) => {
    const labels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const defaultValues = new Array(labels.length).fill(0);

    data?.forEach(({ day, count }) => {
        const dayIndex = day % 7;
        if (dayIndex >= 0 && dayIndex < defaultValues.length) {
            defaultValues[dayIndex] = count;
        }
    });

    return {
        labels: labels,
        datasets:
          {
              label: "Joined",
              data: defaultValues
          }

    };
};

export default useDailyClientInsightsData;