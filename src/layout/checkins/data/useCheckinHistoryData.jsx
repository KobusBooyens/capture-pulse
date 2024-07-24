import React, { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import Box from "../../../components/Box/Box.jsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import moodOptions from "../../../data/moodOptions.jsx";

export const useCheckinHistoryData = (type, data) => {
    const [isActioned, setIsActioned] = useState({ action: null, data: {} });

    const Actions = ({ data }) => {
        const handleEditCheckin = useCallback((data) => {
            setIsActioned({ action: "edit", data });
        },[]);

        const handleDeleteCheckin = useCallback((data) => {
            setIsActioned({ action: "delete", data });
        },[]);

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

    const columns = useMemo(() => {
        return [
            { Header: "date", accessor: "date", align: "left" },
            { Header: type === "general" ? "mood" : "weight (kg)",
                accessor: type === "general" ? "mood" : "weight", align: "left" },
            { Header: "feedback", accessor: "feedback", align: "left" },
            { Header: "action", accessor: "action", align: "center" },
        ];
    }, [type]);

    const formatDate = (date) => dayjs(date).format("ll");

    const rows = useMemo(() => {
        return data?.map(row => ({
            id: row._id,
            date: formatDate(row.joiningDate),
            [type === "general" ? "mood" : "weight"]: type === "general" ? moodOptions.moodChips[row.mood] : row.weight,
            feedback: row.feedback,
            action: <Actions data={row} />,
        }));
    }, [data, type]);

    return { columns, rows, isActioned, setIsActioned };
};
