import React from "react";
import ComplexStatisticsCard from "../../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import { CircularProgress } from "@mui/material";

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

export default TotalClients;