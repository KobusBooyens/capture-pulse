import React from "react";
import Typography from "../../../components/Typography/Typography.jsx";
import ComplexStatisticsCard from "../../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import PropTypes from "prop-types";

const TotalCheckins = ({ totalClients, totalCheckins, totalRemaining }) => {
    return (
        <ComplexStatisticsCard
            color={"light"}
            icon="settings_accessibility"
            title="Check-ins"
            titleContent={`${totalCheckins}/${totalClients}`}
        >
            <Typography component="p" variant="button" color="text" display="flex" gap={1}>
                <Typography
                    component="span"
                    variant="button"
                    fontWeight="bold"
                    color={"dark"}>
                    {"Remaining"}
                </Typography>
                {totalRemaining}
            </Typography>
        </ComplexStatisticsCard>
    );
};

TotalCheckins.propTypes = {
    totalClients: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    totalCheckins: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    totalRemaining: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default TotalCheckins;
