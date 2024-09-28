import React from "react";
import ComplexStatisticsCard from "../../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import dayjs from "dayjs";
import { CircularProgress } from "@mui/material";

const TotalNewClients = ({ totalNew, isLoading }) => {
    return (
        <ComplexStatisticsCard
            color="primary"
            icon="person_add"
            title="Total New Clients"
            titleContent={`+${totalNew}`}
        >
            {isLoading ? <CircularProgress/> :
                <Typography component="p" variant="button" color="text" display="flex">
                    <Typography
                        component="span"
                        variant="button"
                        fontWeight="bold"
                        color={"primary"}>
                        {`${dayjs().format("MMMM")}`}
                    </Typography>
                </Typography> }
        </ComplexStatisticsCard>
    );
};

export default TotalNewClients;