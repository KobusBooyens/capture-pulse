import React, { useCallback, useState } from "react";
import Box from "../../../components/Box/Box.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Typography from "../../../components/Typography/Typography.jsx";

const useBillingHistoryData = (data) => {
    const [isActioned, setIsActioned] = useState({ action: null, data: {} });
    const handleEditCheckin = useCallback((data) => {
        setIsActioned({ action: "edit", data });
    },[]);

    const handleDeleteCheckin = useCallback((data) => {
        setIsActioned({ action: "delete", data });
    },[]);

    const Actions = ({ data }) => {
        return (
            <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title="Edit" placement="top">
                    <IconButton onClick={() => handleEditCheckin(data)}>
                        <Icon fontSize="small" color="info">
              edit
                        </Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                    <IconButton onClick={() => handleDeleteCheckin(data)}>
                        <Icon fontSize="small" color="error">
              delete
                        </Icon>
                    </IconButton>
                </Tooltip>
            </Box>
        );
    };

    Actions.propTypes = {
        data: PropTypes.object,
    };

    const formatDate = (date) => dayjs(date).format("ll");

    const columns = [
        {
            headerName: "Date",
            field: "date",
            renderCell: (params) =>
                <Typography variant="normal" color="text">
                    {formatDate(params.row.date)}
                </Typography>,
            flex: 0.5,
            sortable: true
        },
        {
            headerName: "Amount",
            field: "amount",
            flex: 0.5,
            renderCell: (params) =>
                <Typography variant="normal" color="text">
                    {params.row.amount}
                </Typography>
        },
        {
            headerName: "Reference",
            field: "reference",
            flex: 1.5,
            sortable: false,

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

    const rows = data.records.map(row => ({
        id: row._id,
        date: row.date,
        amount: row.amount,
        reference: row.reference,
        _id: row._id,
        client: data.client._id
    }));

    return {
        columns,
        rows,
        isActioned,
        setIsActioned
    };

};
export default useBillingHistoryData;
