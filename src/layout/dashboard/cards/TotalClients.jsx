import React from "react";
import ComplexStatisticsCard from "../../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const TotalClients = ({ totalClients, totalMales, totalFemales, isLoading }) => {
    return (
        <ComplexStatisticsCard
            color="dark"
            icon="people_alt"
            title="Total Clients"
            titleContent={totalClients}
            isLoading={isLoading}
        >
            {isLoading ? <CircularProgress/> :
        
                <Typography component="p" variant="button" color="text" display="flex" gap={1}>
                    <Typography
                        component="span"
                        variant="button"
                        fontWeight="bold"
                        color={"male"}>
                        {"Males"}
                    </Typography>
                    {totalMales}
                    <Typography
                        component="span"
                        variant="button"
                        fontWeight="bold"
                        color={"female"}>
                        {"Female"}
                    </Typography>
                    {totalFemales}
                </Typography>
            }
        </ComplexStatisticsCard>
    );
};

TotalClients.propTypes = {
    totalClients: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    totalMales: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    totalFemales: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isLoading: PropTypes.bool,
};

export default TotalClients;