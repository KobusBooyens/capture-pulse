import React from "react";
import ComplexStatisticsCard from "../../../controls/Cards/StatisticsCards/ComplexStatisticsCard";
import Typography from "../../../components/Typography/Typography";
import { CircularProgress } from "@mui/material";

const TotalClientsCard = ({ totalClients, totalMales, totalFemales, isLoading }) => {
    console.log({ totalClients, totalMales, isLoading });
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
                        color={"info"}>
                        {"Males"}
                    </Typography>
                    {totalMales}
                    <Typography
                        component="span"
                        variant="button"
                        fontWeight="bold"
                        color={"primary"}>
                        {"Female"}
                    </Typography>
                    {totalFemales}
                </Typography>
            }
        </ComplexStatisticsCard>
    );
};

export default TotalClientsCard;   