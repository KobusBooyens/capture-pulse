import Box from "../../../components/Box/Box.jsx";
import Avatar from "../../../components/Avatar/Avatar.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useDeleteClient from "../../../api/clients/useDeleteClient.js";
import { useCallback, useState } from "react";

export default function data(data) {
    const navigate = useNavigate();

    const ClientDetail = ({ name, surname, contactNumber, gender }) =>
        <Box display="flex" alignItems="center" lineHeight={1}>
            <Avatar sx={{ bgcolor: gender === "Female" ? "#f75b95" : "#02b0f0" }}>
                <Icon fontSize={"small"}>account_circle</Icon>
            </Avatar>
            <Box ml={2} lineHeight={1}>
                <Typography display="block" variant="button" fontWeight="medium">
                    {name} {surname}
                </Typography>
                <Typography variant="caption" >
                    {contactNumber}
                </Typography>
            </Box>
        </Box>
  ;

    ClientDetail.propTypes = {
        name: PropTypes.string,
        surname: PropTypes.string,
        contactNumber: PropTypes.string,
        gender: PropTypes.string,
    };

    const PackageDetail = ({ name, goal }) =>
        <Box lineHeight={1} textAlign="left">
            <Typography display="block" variant="caption" color="text" fontWeight="medium">
                {name}
            </Typography>
            <Typography variant="caption">{goal}</Typography>
        </Box>
  ;

    PackageDetail.propTypes = {
        name: PropTypes.string,
        goal: PropTypes.string
    };

    const Actions = ({ data }) =>
        <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Edit" placement="top">
                <IconButton onClick={() => navigate(`./edit/${data._id}`)}>
                    <Icon fontSize="small" color="info">edit</Icon>
                </IconButton>
            </Tooltip>
            <Tooltip title="Remove" placement="top">
                <IconButton onClick={() => console.log("deleting record", data)}>
                    <Icon fontSize="small" color="error">delete</Icon>
                </IconButton>
            </Tooltip>
        </Box>;

    Actions.propTypes = {
        data: PropTypes.object,
    };

    const formatDate = (date) => {
        return dayjs(date).format("YYYY-MM-DD");
    };

    const columns = [
        { Header: "client", accessor: "client", align: "left" },
        { Header: "package", accessor: "package", align: "left" },
        { Header: "joined", accessor: "joined", align: "left" },
        { Header: "action", accessor: "action", align: "center" },
    ];

    const rows = data.map(row => {
        return {
            id: row._id,
            client: <ClientDetail
                name={row.firstName}
                surname={row.lastName}
                gender={row.gender}
                contactNumber={row.contactNumber}
            />,
            package: <PackageDetail name={row.package.name} goal={row.goal} />,
            joined: formatDate(row.joiningDate) ,
            action: <Actions data={row} />,
        };
    });

    return {
        columns: columns,
        rows: rows,
    };
}
