import Box from "../../../components/Box/Box.jsx";
import Avatar from "../../../components/Avatar/Avatar.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import Badge from "../../../components/Badge/Badge.jsx";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function data() {
    const ClientDetail = ({ name, surname, phoneNumber, gender = "Male" }) =>
        <Box display="flex" alignItems="center" lineHeight={1}>
            <Avatar sx={{
                bgcolor: gender === "Female" ? "#f75b95" : "#02b0f0"
            }}>
                <Icon fontSize={"small"}>account_circle</Icon>
            </Avatar>
            <Box ml={2} lineHeight={1}>
                <Typography display="block" variant="button" fontWeight="medium">
                    {name} {surname}
                </Typography>
                <Typography variant="caption">{phoneNumber}</Typography>
            </Box>
        </Box>
  ;

    const PackageDetail = ({ name, goal }) =>
        <Box lineHeight={1} textAlign="left">
            <Typography display="block" variant="caption" color="text" fontWeight="medium">
                {name}
            </Typography>
            <Typography variant="caption">{goal}</Typography>
        </Box>
  ;

    const Actions = () =>
        <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Edit" placement="top">
                <IconButton onClick={() => console.log("editing client")}>
                    <Icon fontSize="small" color="info">edit</Icon>
                </IconButton>
            </Tooltip>
            <Tooltip title="Remove" placement="top">
                <IconButton onClick={() => console.log("deleting client")}>
                    <Icon fontSize="small" color="error">delete</Icon>
                </IconButton>
            </Tooltip>
        </Box>;

    return {
        columns: [
            { Header: "client", accessor: "client", align: "left" },
            { Header: "package", accessor: "package", align: "left" },
            { Header: "joined", accessor: "joined", align: "left" },
            { Header: "action", accessor: "action", align: "center" },
        ],

        rows: [
            {
                client: <ClientDetail name="John" surname="Michael" gender="Male" phoneNumber="585425742" />,
                package: <PackageDetail name="3 Months" goal="Weight Loss" />,
                joined: "23/04/18",
                action: <Actions />,

            },
            {
                client: <ClientDetail name="Alexa" surname="Liras" gender="Female" phoneNumber="2574586982" />,
                package: <PackageDetail name="6 Months" goal="Maintenance" />,
                joined: "23/04/18",
                action: <Actions />
            },
            {
                client: <ClientDetail name="Laurent" surname="Perrier" gender="Female" phoneNumber="2584756985" />,
                package: <PackageDetail name="3 Months" goal="Weight Loss" />,
                joined: "23/04/18",
                action: <Actions />
            },
            {
                client: <ClientDetail name="Michael" surname="Levi" gender="Male" phoneNumber="523685745" />,
                package: <PackageDetail name="3 Months" goal="Weight Loss" />,
                joined: "23/04/18",
                action: <Actions />
            },
            {
                client: <ClientDetail name="Richard" surname="Gran" gender="Male" phoneNumber="268587452" />,
                package: <PackageDetail name="3 Months" goal="Maintenance" />,
                joined: "23/04/18",
                action: <Actions />
            },
            {
                client: <ClientDetail name="Miriam" surname="Eric" gender="Female" phoneNumber="2568574542" />,
                package: <PackageDetail name="3 Months" goal="Body Buidling" />,
                joined: "23/04/18",
                action: <Actions />
            },
        ],
    };
}
