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
import Typography from "../../../components/Typography/Typography.jsx";

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
        {
            headerName: "Client",
            field: "client",
            flex: 1,
            renderCell: (params) =>
                <Box sx={{ ml: 2, maxHeight: "100%" }} >
                    <ClientDetails
                        name={params.row.firstName}
                        surname={params.row.lastName}
                        gender={params.row.gender}
                        contactNumber={params.row.contactNumber}
                    />
                </Box>,
            sortable: true
        },
        {
            headerName: "Package",
            field: "package",
            flex: 1,
            renderCell: (params) =>
                <PackageDetails
                    name={params.row?.packageName ?? "N/A"}
                    goal={params.row.goal}
                    partnersDetail={params.row.packagePartners}
                />,
            sortable: false
        },
        {
            headerName: "Joined",
            field: "joined",
            renderCell: (params) =>
                <Typography variant="normal" color="text">
                    {formatDate(params.row.joined)}
                </Typography>,
            flex: 0.5,
            sortable: true
        },
        {
            headerName: "Last Weighing",
            field: "latestWeighingDate",
            align:"center",
            renderCell: (params) =>
                <Typography variant="normal" color="text">
                    {params.row.latestWeighingDate ? formatDate(params.row.latestWeighingDate) : "-"}
                </Typography>,
            flex: 0.5,
            sortable: true
        },
        {
            headerName: "Action",
            field: "action",
            align: "center",
            flex: 0.5,
            renderCell: (params) =>
                <Actions data={params.row} />,
            sortable: false
        }
    ];

    const rows = data?.map((row) => ({
        id: row._id,
        firstName: row.firstName,
        lastName: row.lastName,
        gender: row.gender,
        contactNumber: row.contactNumber,
        packageName: row?.packageName,
        goal: row.goal,
        packagePartners: row.packagePartners,
        joined: row.joiningDate,
        latestWeighingDate: row.latestWeighingDate,
        _id: row._id,
    }));

    return { columns, rows, isAdding, setIsAdding };
};
