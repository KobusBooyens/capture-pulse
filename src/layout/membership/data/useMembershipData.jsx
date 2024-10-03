// import React, { useCallback, useState } from "react";
// import dayjs from "dayjs";
// import ClientDetails from "../../shared/ClientDetails.jsx";
// import { Chip, useMediaQuery, useTheme } from "@mui/material";
// import PackageDetails from "../../shared/PackageDetails.jsx";
// import Typography from "../../../components/Typography/Typography.jsx";
// import Box from "../../../components/Box/Box.jsx";
// import Badge from "../../../components/Badge/Badge.jsx";
// import IconButton from "@mui/material/IconButton";
// import Icon from "@mui/material/Icon";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Tooltip from "@mui/material/Tooltip";
// import PropTypes from "prop-types";
//
// const useMembershipData = (data) => {
//     const [isEditing, setIsEditing] = useState({ show: false, data: [], clientId: null });
//     const theme = useTheme();
//     const isXs = useMediaQuery(theme.breakpoints.down("md"));
//
//     const Actions = ({ data }) => {
//         const [anchorEl, setAnchorEl] = useState(null);
//         const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
//         const handleMenuClose = () => setAnchorEl(null);
//
//         // const handleDeleteClient = useCallback((data) => {
//         //     setIsDeleting({ deleting: true, data });
//         //     handleMenuClose();
//         // },[]);
//         //
//         // const handleViewNotes = useCallback((data) => {
//         //     setViewNotes({ show: true, data: data.clientNotes, clientId: data._id });
//         //     handleMenuClose();
//         // });
//         //
//         const handleEdit = (record) => {
//             setIsEditing({ show: true, data: record, clientId: record._id });
//             handleMenuClose();
//             // navigate(`./edit/${data._id}`);
//         };
//
//         return (
//             <Box>
//                 {isXs ?
//                     <>
//                         <Badge badgeContent={data.clientNotes?.length} overlap={"circular"}
//                             circular size={"xs"} color={"light"}>
//                             <IconButton onClick={handleMenuClick}>
//                                 <Icon fontSize="small">more_vert</Icon> {/* Hamburger or dotted menu icon */}
//                             </IconButton>
//                         </Badge>
//                         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//                             <MenuItem onClick={() => handleEdit(data)}>
//                                 <Box display={"flex"} gap={1}>
//                                     <Icon fontSize="small" color="info">edit</Icon>
//                                     <Typography variant={"button"}>
//                                     Update
//                                     </Typography>
//                                 </Box>
//                             </MenuItem>
//                             {/*<MenuItem onClick={() => handleViewNotes(data)}>*/}
//                             {/*    <Box display={"flex"} gap={1}>*/}
//                             {/*        <Badge badgeContent={data.clientNotes?.length}*/}
//                             {/*               circular size={"xs"} color={"light"}>*/}
//                             {/*            <Icon fontSize="small" color="action">notes</Icon>*/}
//                             {/*        </Badge>*/}
//                             {/*        <Typography variant={"button"}>*/}
//                             {/*            View Notes*/}
//                             {/*        </Typography>*/}
//                             {/*    </Box>*/}
//                             {/*</MenuItem>*/}
//                             {/*<MenuItem onClick={() => handleDeleteClient(data)}>*/}
//                             {/*    <Box display={"flex"} gap={1}>*/}
//                             {/*        <Icon fontSize="small" color="error">delete</Icon>*/}
//                             {/*        <Typography variant={"button"}>*/}
//                             {/*            Remove*/}
//                             {/*        </Typography>*/}
//                             {/*    </Box>*/}
//                             {/*</MenuItem>*/}
//                         </Menu>
//                     </> :
//                     <>
//                         <Tooltip title="Update" placement="top">
//                             <IconButton onClick={() => handleEdit(data)}>
//                                 <Icon fontSize="small" color="info">edit</Icon>
//                             </IconButton>
//                         </Tooltip>
//                         {/*<Tooltip title="Notes" placement="top">*/}
//                         {/*    <IconButton onClick={() => handleViewNotes(data)}>*/}
//                         {/*        <Badge badgeContent={data.clientNotes?.length}*/}
//                         {/*            circular size={"xs"} color={"light"}>*/}
//                         {/*            <Icon fontSize="small" color={"action"}>notes</Icon>*/}
//                         {/*        </Badge>*/}
//
//                         {/*    </IconButton>*/}
//                         {/*</Tooltip>*/}
//                         {/*<Tooltip title="Remove" placement="top">*/}
//                         {/*    <IconButton onClick={() => handleDeleteClient(data)}>*/}
//                         {/*        <Icon fontSize="small" color="error">delete</Icon>*/}
//                         {/*    </IconButton>*/}
//                         {/*</Tooltip>*/}
//                     </>
//                 }
//             </Box>
//         );
//     };
//
//     Actions.propTypes = {
//         data: PropTypes.object,
//     };
//
//     const formatDate = (date) => dayjs(date).format("ll");
//
//     const columns = [
//         {
//             headerName: "Client",
//             field: "client",
//             align: "left",
//             flex: 0.5,
//             renderCell: (params) =>
//                 <ClientDetails
//                     name={params.row.firstName}
//                     surname={params.row.lastName}
//                     gender={params.row.gender}
//                     contactNumber={params.row.contactNumber}
//                 />,
//             sortable: true
//         },
//         {
//             headerName: "Membership Status",
//             field: "membershipStatus",
//             align: "left",
//             flex: 0.5,
//             renderCell: (params) => <Chip color={"warning"} label={"Pending"}/>
//         },
//         {
//             headerName: "Package",
//             field: "package",
//             align: "left",
//             flex: 0.5,
//             renderCell: (params) =>
//                 <PackageDetails
//                     name={params.row?.packageName}
//                     goal={params.row.goal}
//                     partnersDetail={params.row.packagePartners}
//                 />,
//             sortable: false
//         },
//         {
//             headerName: "Joined",
//             field: "joined",
//             align: "left",
//             flex: 0.5,
//             renderCell: (params) =>
//                 <Typography variant="normal" color="text">
//                     {params.row.joiningDate ? formatDate(params.row.joiningDate) : "-"}
//                 </Typography>,
//
//             sortable: true
//         },
//         {
//             headerName: "Action",
//             field: "action",
//             align: "left",
//             flex: 0.5,
//             renderCell: (params) =>
//                 <Actions data={params.row} />,
//             sortable: false
//         }
//     ];
//
//     const rows = data?.map((row) => ({
//         id: row._id,
//         firstName: row.firstName,
//         lastName: row.lastName,
//         gender: row.gender,
//         contactNumber: row.contactNumber,
//         agent: row.agent,
//         packageName: row?.packageName,
//         amount: row?.amount,
//         goal: row.goal,
//         packagePartners: row.packagePartners,
//         joiningDate: row.joiningDate,
//         paymentDay: row.paymentDay,
//         weight: row.weight,
//         height: row.height,
//
//         _id: row._id,
//     }));
//
//     return {
//         rows, columns
//     };
// };
// export default useMembershipData;
