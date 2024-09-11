import React, { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import Box from "../../../components/Box/Box.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import moodOptions from "../../../data/moodOptions.jsx";
import Typography from "../../../components/Typography/Typography.jsx";

export const useCheckinHistoryData = (type, data) => {
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
            headerName: type === "general" ? "Mood" : "Weight (kg)",
            field: type === "general" ? "mood" : "weight",
            flex: 0.5,
            renderCell: (params) =>
                type === "general" ? moodOptions.moodChips[params.row.mood] : params.row.weight
        },
        {
            headerName: "Feedback",
            field: "feedback",
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

    const rows = data?.records?.map(row => ({
        id: row._id,
        date: row.date,
        [type === "general" ? "mood" : "weight"]: type === "general" ? row.mood : row.weight,
        feedback: row.feedback,
        _id: row._id,
        client: data.client
    }));

    return {
        columns,
        rows,
        isActioned,
        setIsActioned
    };
};
