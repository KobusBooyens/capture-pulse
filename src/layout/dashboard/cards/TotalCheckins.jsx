import React from "react";
import Typography from "../../../components/Typography/Typography.jsx";
import ComplexStatisticsCard from "../../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import PropTypes from "prop-types";
import StandardStatisticsCard from "../../../controls/Cards/StatisticsCards/StandardStatisticsCard.jsx";
import { getWeekOfMonth } from "../../../utils/functions.js";
import dayjs from "dayjs";
import { Chip } from "@mui/material";

const TotalCheckins = ({ totalClients, totalCheckins, totalRemaining, isLoading }) => {
    console.log({ totalClients, totalCheckins });
    return (
        <StandardStatisticsCard
            color={"light"}
            icon="settings_accessibility"
            title="Check-ins this week"
            subTitle={totalClients ? `${totalCheckins ?? 0}/${totalClients}` : "No clients available"}
            watermark={`${Math.round(totalCheckins ?? 0 / totalClients * 100)}%`}
            isLoading={isLoading}
        >
            <Typography component="p" variant="button" color="text" display="flex" gap={1}>
                <Chip title={"Current week"} size={"small"} label={
                    <Typography variant="h6" fontWeight={"light"}>
                        {`Week ${getWeekOfMonth()}`}
                    </Typography>
                }/>
            </Typography>
        </StandardStatisticsCard>
    );
};

TotalCheckins.propTypes = {
    totalClients: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    totalCheckins: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    totalRemaining: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isLoading: PropTypes.bool
};
export default TotalCheckins;
