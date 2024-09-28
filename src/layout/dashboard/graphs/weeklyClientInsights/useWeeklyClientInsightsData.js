const useWeeklyClientInsightsData = (data) => {
    const labels = data?.map(r => `WEEK ${r.weekNumber}`);
    const defaultValues = new Array(labels?.length).fill(0);

    data?.forEach(({ weekNumber, totalCount }) => {
        defaultValues[weekNumber] = totalCount;
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

export default useWeeklyClientInsightsData;