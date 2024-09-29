import Box from "../../../components/Box/Box.jsx";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import ClientDetails from "../../shared/ClientDetails.jsx";
import PackageDetails from "../../shared/PackageDetails.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import Badge from "../../../components/Badge/Badge.jsx";
import IconButton from "@mui/material/IconButton";

export default function useClientData(data) {
    const [isDeleting, setIsDeleting] = useState({ deleting: false, data: {} });
    const [viewNotes, setViewNotes] = useState({ show: false, data: [], clientId: null });

    const handleDeleteClient = useCallback((data) => {
        setIsDeleting({ deleting: true, data });
    },[]);

    const handleViewNotes = useCallback((data) => {
        setViewNotes({ show: true, data: data.notes, clientId: data._id });
    });

    const Actions = ({ data }) => {
        const navigate = useNavigate();
        return (
            <Box>
                <Tooltip title="Edit" placement="top">
                    <IconButton onClick={() => navigate(`./edit/${data._id}`)}>
                        <Icon fontSize="small" color="info">edit</Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Notes" placement="top">
                    <IconButton onClick={() => handleViewNotes(data)}>
                        <Badge badgeContent={data.notes.length} circular size={"xs"} color={"light"}>
                            <Icon fontSize="small" color={"action"}>notes</Icon>
                        </Badge>

                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove" placement="top">
                    <IconButton onClick={() => handleDeleteClient(data)}>
                        <Icon fontSize="small" color="error">delete</Icon>
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
            headerName: "Client",
            field: "client",
            align: "left",
            flex: 0.5,
            renderCell: (params) =>
                <ClientDetails
                    name={params.row.firstName}
                    surname={params.row.lastName}
                    gender={params.row.gender}
                    contactNumber={params.row.contactNumber}
                />,
            sortable: true
        },
        {
            headerName: "Package",
            field: "package",
            align: "left",
            flex: 0.5,
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
            align: "left",
            flex: 0.5,
            renderCell: (params) =>
                <Typography variant="normal" color="text">
                    {formatDate(params.row.joined)}
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
        gender: row.gender,
        contactNumber: row.contactNumber,
        packageName: row?.packageName,
        goal: row.goal,
        packagePartners: row.packagePartners,
        joined: row.joiningDate,
        notes: row.clientNotes,
        _id: row._id,
    }));

    return {
        columns,
        rows,
        viewNotes,
        setViewNotes,
        isDeleting,
        setIsDeleting
    };
}
