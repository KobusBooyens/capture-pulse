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
import { Chip, useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function useClientData(data) {
    const [isDeleting, setIsDeleting] = useState({ deleting: false, data: {} });
    const [viewNotes, setViewNotes] = useState({ show: false, data: [], clientId: null });
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("md"));

    const Actions = ({ data }) => {
        const navigate = useNavigate();
        const [anchorEl, setAnchorEl] = useState(null);
        const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
        const handleMenuClose = () => setAnchorEl(null);

        const handleDeleteClient = useCallback((data) => {
            setIsDeleting({ deleting: true, data });
            handleMenuClose();
        },[]);

        const handleViewNotes = useCallback((data) => {
            setViewNotes({ show: true, data: data.clientNotes, clientId: data._id });
            handleMenuClose();
        });

        const handleEdit = () => {
            handleMenuClose();
            navigate(`./edit/${data._id}`);
        };

        return (
            <Box>
                {isXs ?
                    <>
                        <Badge variant={"dot"} overlap="circular"
                            circular size={"xs"} color={"light"}>
                            <IconButton onClick={handleMenuClick}>
                                <Icon fontSize="small">more_vert</Icon> {/* Hamburger or dotted menu icon */}
                            </IconButton>
                        </Badge>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={handleEdit}>
                                <Box display={"flex"} gap={1}>
                                    <Icon fontSize="small" color="info">edit</Icon>
                                    <Typography variant={"button"}>
                                        Edit
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={() => handleViewNotes(data)}>
                                <Box display={"flex"} gap={1}>
                                    <Badge badgeContent={data.clientNotes?.length}
                                        circular size={"xs"} color={"light"}>
                                        <Icon fontSize="small" color="action">notes</Icon>
                                    </Badge>
                                    <Typography variant={"button"}>
                                        View Notes
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={() => handleDeleteClient(data)}>
                                <Box display={"flex"} gap={1}>
                                    <Icon fontSize="small" color="error">delete</Icon>
                                    <Typography variant={"button"}>
                                        Remove
                                    </Typography>
                                </Box>
                            </MenuItem>
                        </Menu>
                    </> :
                    <>
                        <Tooltip title="Edit" placement="top">
                            <IconButton onClick={handleEdit}>
                                <Icon fontSize="small" color="info">edit</Icon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notes" placement="top">
                            <IconButton onClick={() => handleViewNotes(data)}>
                                <Badge badgeContent={data.clientNotes?.length}
                                    circular size={"xs"} color={"light"}>
                                    <Icon fontSize="small" color={"action"}>notes</Icon>
                                </Badge>

                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove" placement="top">
                            <IconButton onClick={() => handleDeleteClient(data)}>
                                <Icon fontSize="small" color="error">delete</Icon>
                            </IconButton>
                        </Tooltip>
                    </>
                }
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
            headerName: "Membership Status",
            field: "membershipStatus",
            align: "left",
            flex: 0.5,
            renderCell: (params) => <Chip color={"warning"} label={"Pending First Payment"}/>
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
        clientNotes: row.clientNotes,
        _id: row._id,
    }));

    const cardItemsContent = () => {
        return data?.map(row =>
            <>
                {/*Heading/Title*/}
                <Box display={"flex"} flexDirection={"column"} gap={1} key={row._id}>
                    <Box display={"flex"} justifyContent={"space-between"} pt={2}>
                        <ClientDetails
                            name={row.firstName}
                            surname={row.lastName}
                            gender={row.gender}
                            contactNumber={row.contactNumber}
                        />
                        <Actions data={row}/>
                    </Box>

                    <Chip
                        color={"warning"}
                        label={
                            <Box display={"flex"} alignItems="center" gap={1} >
                                <Icon fontSize={"small"}>card_membership</Icon>
                        Pending First Payment
                            </Box>
                        }
                    />
                </Box>
                <Divider/>
                {/*Content*/}
                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} gap={2}>
                    <Typography variant={"button"}>Joined: Pending</Typography>
                    <Typography variant={"button"}>Package: Pending</Typography>
                </Box>
            </>
        );
    };

    return {
        columns,
        rows,
        cardItemsContent,
        viewNotes,
        setViewNotes,
        isDeleting,
        setIsDeleting
    };
}
