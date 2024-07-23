import React, { useMemo } from "react";
import dayjs from "dayjs";
import Box from "../../../components/Box/Box.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import moodOptions from "../../../data/moodOptions.jsx";
import { Chip } from "@mui/material";

const formatDate = (date) => dayjs(date).format("ll");

const Actions = ({ data }) => {
    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Edit" placement="top">
                <IconButton onClick={() => console.log("editing record", data)}>
                    <Icon fontSize="small" color="info">
                      edit
                    </Icon>
                </IconButton>
            </Tooltip>
        </Box>
    );
};

Actions.propTypes = {
    data: PropTypes.object,
};

export const useCheckinHistoryData = (type, data) => {
    const columns = useMemo(() => {
        return [
            { Header: "date", accessor: "date", align: "left" },
            { Header: type === "general" ? "mood" : "weight (kg)",
                accessor: type === "general" ? "mood" : "weight", align: "left" },
            { Header: "feedback", accessor: "feedback", align: "left" },
            { Header: "action", accessor: "action", align: "center" },
        ];
    }, [type]);

    const rows = useMemo(() => {
        return data?.map(row => ({
            id: row._id,
            date: formatDate(row.joiningDate),
            [type === "general" ? "mood" : "weight"]: type === "general" ? moodOptions.moodChips[row.mood] : row.weight,
            feedback: row.feedback,
            action: <Actions data={row} />,
        }));
    }, [data, type]);

    return { columns, rows };
};
