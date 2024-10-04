import Box from "../../../components/Box/Box.jsx";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import ClientDetails from "../../shared/ClientDetails.jsx";
import PackageDetails from "../../shared/PackageDetails.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import Badge from "../../../components/Badge/Badge.jsx";
import IconButton from "@mui/material/IconButton";
import { Chip, useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function useClientData(data, selectedAction, setSelectedAction) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("md"));

    const Actions = ({ data }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
        const handleMenuClose = () => setAnchorEl(null);

        const handleSelectedAction = useCallback((data, action) => {
            setSelectedAction({ action: action, show: true, data: data, clientId: data._id });
            handleMenuClose();
        }, []);

        return (
            <Box>
                {isXs ?
                    <>
                        <Badge badgeContent={data.clientNotes?.length} overlap={"circular"}
                            circular size={"xs"} color={"light"}>
                            <IconButton onClick={handleMenuClick}>
                                <Icon fontSize="small">more_vert</Icon> {/* Hamburger or dotted menu icon */}
                            </IconButton>
                        </Badge>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={() => handleSelectedAction(data, "edit")}>
                                <Box display={"flex"} gap={1}>
                                    <Icon fontSize="small" color="info">edit</Icon>
                                    <Typography variant={"button"}>
                                        Edit
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={() => handleSelectedAction(data, "membership")}>
                                <Box display={"flex"} gap={1}>
                                    <Icon fontSize="small" color="warning">card_membership</Icon>
                                    <Typography variant={"button"}>
                                        Membership
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={() => handleSelectedAction(data, "notes")}>
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
                            <MenuItem onClick={() => handleSelectedAction(data, "delete")}>
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
                            <IconButton onClick={() => handleSelectedAction(data, "edit")}>
                                <Icon fontSize="small" color="info">edit</Icon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Membership" placement="top">
                            <IconButton onClick={() => handleSelectedAction(data, "membership")}>
                                <Icon fontSize="small" color={"warning"}>card_membership</Icon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notes" placement="top">
                            <IconButton onClick={() => handleSelectedAction(data, "notes")}>
                                <Badge badgeContent={data.clientNotes?.length}
                                    circular size={"xs"} color={"light"}>
                                    <Icon fontSize="small" color={"action"}>notes</Icon>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove" placement="top">
                            <IconButton onClick={() => handleSelectedAction(data, "delete")}>
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
            headerName: "Status",
            field: "membershipStatus",
            align: "left",
            flex: 0.5,
            renderCell: (params) => <Chip color={"warning"} label={"Pending"}/>
        },
        {
            headerName: "Package",
            field: "package",
            align: "left",
            flex: 0.5,
            renderCell: (params) =>
                <PackageDetails
                    name={params.row?.packageName}
                    goal={params.row?.goalName}
                    // partnersDetail={params.row.packagePartners}
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
                    {params.row.joiningDate ? formatDate(params.row.joiningDate): "-"}
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
        //client details
        id: row._id,
        _id: row._id,
        firstName: row.firstName,
        lastName: row.lastName,
        gender: row.gender,
        email: row.email,
        dob: row.dob,
        contactNumber: row.contactNumber,
        agent: row.agent,
        clientNotes: row.clientNotes,

        //membership details
        membership: row.membership._id,
        goalName: row.membership.goal.name,
        goal: row.membership.goal._id,
        packageName: row.membership.package.name,
        package: row.membership.package._id,
        // packagePartners: row.packagePartners,
        joiningDate: row.membership.joiningDate,
        paymentDay: row.membership.paymentDay,
        amount: row.membership.amount,
        height: row.membership.height,
        weight: row.membership.weight,

    }));

    const cardItemsContent = () => {
        return rows?.map(row =>
            <>
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
                                  Membership Pending
                            </Box>
                        }
                    />
                </Box>
                <Divider/>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} gap={2}>
                    <PackageDetails
                        name={row?.packageName}
                        goal={row?.goalName}
                        placeholder={
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
                                <Typography variant="caption" color="text" fontWeight="medium"><Icon fontSize={"medium"}>pending</Icon></Typography>
                                <Typography variant="caption" >Membership is pending</Typography>
                            </Box>}
                    />
                    {row.joiningDate &&
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} height={"100%"}>
                            <Typography variant="caption" color="text" fontWeight="medium">Joining Date</Typography>
                            <Typography variant="caption">{row.joiningDate ? formatDate(row.joiningDate) : "-"}</Typography>
                        </Box>
                    }
                </Box>
            </>
        );
    };

    return {
        columns, rows,
        cardItemsContent,
        selectedAction,
        setSelectedAction
    };
}
