import React from "react";
import ComplexStatisticsCard from "../../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import dayjs from "dayjs";
import { Chip, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import StandardStatisticsCard from "../../../controls/Cards/StatisticsCards/StandardStatisticsCard.jsx";

const TotalNewClients = ({ totalNew, isLoading }) => {
    return (
        <StandardStatisticsCard
            color="primary"
            icon="person_add"
            title="Total New Clients"
            // subTitle={`+${totalNew}`}
            watermark={`+${totalNew}`}
        >
            {isLoading ? <CircularProgress/> :
                <Typography component="p" variant="button" color="text" display="flex">
                    <Chip title={"Current month"} size={"small"} label={
                        <Typography variant="h6" fontWeight={"light"}>
                            { dayjs().format("MMMM")}
                        </Typography>
                    }/>
                </Typography> }
        </StandardStatisticsCard>
    );
};

TotalNewClients.propTypes = {
    totalNew: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isLoading: PropTypes.bool,
};

export default TotalNewClients;