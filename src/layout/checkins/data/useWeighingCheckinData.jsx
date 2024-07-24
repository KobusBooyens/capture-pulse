import React, { useCallback, useState } from "react";
import Box from "../../../components/Box/Box.jsx";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ClientDetails from "../../shared/ClientDetails.jsx";
import PackageDetails from "../../shared/PackageDetails.jsx";

export const useWeighingCheckinData = (data) => {

    const [isAdding, setIsAdding] = useState({ adding: false, data: {} });

    const handleAddCheckin = useCallback((data) => {
        setIsAdding({ adding: true, data });
    },[]);

    const Actions = ({ data }) => {
        const navigate = useNavigate();
        return <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Add" placement="top">
                <IconButton onClick={() => handleAddCheckin(data)}>
                    <Icon fontSize="small" color="info">inventory_outlined</Icon>
                </IconButton>
            </Tooltip>
            <Tooltip title="View History" placement="top">
                <IconButton onClick={() => navigate(`./history/${data._id}`)}>
                    <Icon fontSize="small" color="secondary">history</Icon>
                </IconButton>
            </Tooltip>
        </Box>;
    };

    Actions.propTypes = {
        data: PropTypes.object,
    };

    const formatDate = (date) => {
        return dayjs(date).format("ll");
    };

    const columns = [
        { Header: "client", accessor: "client", align: "left" },
        { Header: "package", accessor: "package", align: "left" },
        { Header: "joined", accessor: "joined", align: "left" },
        { Header: "last weighing", accessor: "lastWeighing", align: "left" },
        { Header: "action", accessor: "action", align: "center" },
    ];

    const rows = data.map(row => {
        return {
            id: row._id,
            client: <ClientDetails
                name={row.firstName}
                surname={row.lastName}
                gender={row.gender}
                contactNumber={row.contactNumber}
            />,
            package: <PackageDetails name={row.package.name} goal={row.goal} />,
            joined: formatDate(row.joiningDate),
            lastWeighing: formatDate(new Date()),
            action: <Actions data={row} />,
        };
    });
    return { columns, rows, isAdding, setIsAdding };
};
