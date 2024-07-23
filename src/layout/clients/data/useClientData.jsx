import Box from "../../../components/Box/Box.jsx";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import ClientDetails from "../../shared/ClientDetails.jsx";
import PackageDetails from "../../shared/PackageDetails.jsx";

export default function data(data) {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState({ deleting: false, data: {} });

    const handleDeleteClient = useCallback((data) => {
        setIsDeleting({ deleting: true, data });
    },[]);

    const Actions = ({ data }) =>
        <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Edit" placement="top">
                <IconButton onClick={() => navigate(`./edit/${data._id}`)}>
                    <Icon fontSize="small" color="info">edit</Icon>
                </IconButton>
            </Tooltip>
            <Tooltip title="Remove" placement="top">
                <IconButton onClick={() => handleDeleteClient(data)}>
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
            client: <ClientDetails
                name={row.firstName}
                surname={row.lastName}
                gender={row.gender}
                contactNumber={row.contactNumber}
            />,
            package: <PackageDetails name={row.package.name} goal={row.goal} />,
            joined: formatDate(row.joiningDate) ,
            action: <Actions data={row} />,
        };
    });

    return {
        columns,
        rows,
        isDeleting,
        setIsDeleting
    };
}
