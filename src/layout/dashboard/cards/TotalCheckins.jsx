import React from "react";
import Typography from "../../../components/Typography/Typography.jsx";
import ComplexStatisticsCard from "../../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";

const TotalCheckins = () => {
    return (
        <ComplexStatisticsCard
            color={"light"}
            icon="settings_accessibility"
            title="Check-ins"
            titleContent="150"
        >
            <Typography component="p" variant="button" color="text" display="flex" gap={1}>
                <Typography
                    component="span"
                    variant="button"
                    fontWeight="bold"
                    color={"dark"}>
                    {"Remaining"}
                </Typography>
                {"131"}
            </Typography>
        </ComplexStatisticsCard>
    );
};
export default TotalCheckins;
