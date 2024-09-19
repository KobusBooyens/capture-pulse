import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "../../../components/Box/Box.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import dayjs from "dayjs";
import Typography from "../../../components/Typography/Typography.jsx";

const UseUsersData = (data) => {

    const [handleAction, setHandleAction] = useState({ action: null, data: { } });

    const handleDeleteUser = (data) => {
        setHandleAction({ action: "delete", data: data });
    };

    const handleEditUser = (data) => {
        setHandleAction({ action: "edit", data: data });
    };

    const Actions = ({ data }) => {
        return (
            <Box>
                <Tooltip title="Edit" placement="top">
                    <IconButton onClick={() => handleEditUser(data)}>
                        <Icon fontSize="small" color="info">edit</Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove" placement="top">
                    <IconButton onClick={() => handleDeleteUser(data)}>
                        <Icon fontSize="small" color="error">delete</Icon>
                    </IconButton>
                </Tooltip>
            </Box>
        );
    };

    Actions.propTypes = {
        data: PropTypes.object,
    };

    const formatDate = (date) => dayjs(date).format("lll");

    const columns = [
        {
            headerName: "First Name",
            field: "firstName",
            align: "left",
            flex: 1,
            sortable: true
        },
        {
            headerName: "Last Name",
            field: "lastName",
            align: "left",
            flex: 1,
            sortable: true
        },
        {
            headerName: "Last Logged In",
            field: "lastLoggedIn",
            align: "left",
            flex: 1,
            renderCell: (params) =>
                <Typography variant="normal" color="text">
                    {params.row.lastLoggedIn ? formatDate(params.row.lastLoggedIn) : "-"}
                </Typography>,
            sortable: true
        },
        {
            headerName: "Logged In",
            field: "loggedIn",
            align: "left",
            flex: 1,
            renderCell: (params) =>
                <Typography variant="normal" color="text">
                    {params.row.loggedIn ? <Icon>check</Icon> : <Icon>close</Icon>}
                </Typography>,
            sortable: true
        },
        {
            headerName: "Action",
            field: "action",
            align: "left",
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
        lastLoggedIn: row.lastLoggedIn,
        loggedIn: row.loggedIn,
        email: row.email,
        contactNumber: row.contactNumber,
        _id: row._id,
    }));

    return {
        columns,
        rows,
        handleAction,
        setHandleAction
    };
};

export default UseUsersData;
