import Dashboard from "../dashboard/dashboard.jsx";
import ViewClients from "../clients/Clients.jsx";
import Checkins from "../checkins/Checkins.jsx";
import Billing from "../billing/billing.jsx";

import Icon from "@mui/material/Icon";
import Notifications from "../notifications/notifications.jsx";
import Settings from "../settings/settings.jsx";
import Users from "../users/users.jsx";
import ViewWeighingCheckin from "../checkins/pages/ViewWeighingCheckin.jsx";
import ViewGeneralCheckin from "../checkins/pages/ViewGeneralCheckin.jsx";
import GeneralCheckins from "../checkins/GeneralCheckins.jsx";
import WeighingCheckins from "../checkins/WeighingCheckins.jsx";

const menuItems = [
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize={"small"}>dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />
    },
    {
        type: "collapse",
        name: "Clients",
        key: "clients",
        icon: <Icon fontSize={"small"}>people_alt</Icon>,
        route: "/clients",
        component: <ViewClients />
    },
    {
        type: "collapse",
        name: "Check-ins",
        key: "checkins",
        icon: <Icon fontSize={"small"}>settings_accessibility</Icon>,
        route: "/checkins",
        component: <Checkins />,
        subMenuItems: [
            {
                type: "item",
                name: "General Check-in",
                key: "generalCheckin",
                icon: <Icon fontSize={"small"}>how_to_reg</Icon>,
                route: "/checkins/general",
                component: <GeneralCheckins />
            },
            {
                type: "item",
                name: "Weighing",
                key: "weighing",
                icon: <Icon fontSize={"small"}>scale</Icon>,
                route: "/checkins/weighing",
                component: <WeighingCheckins />
            }
        ]
    },
    {
        type: "collapse",
        name: "Billing",
        key: "billing",
        icon: <Icon fontSize={"small"}>receipt_long</Icon>,
        route: "/billing",
        component: <Billing />
    },
    {
        type: "collapse",
        name: "Notifications",
        key: "notifications",
        icon: <Icon fontSize={"small"}>notifications</Icon>,
        route: "/notifications",
        component: <Notifications />
    },
    {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <Icon fontSize={"small"}>person</Icon>,
        route: "/users",
        component: <Users />
    },
    {
        type: "collapse",
        name: "Settings",
        key: "settings",
        icon: <Icon fontSize={"small"}>settings</Icon>,
        route: "/settings",
        component: <Settings />
    }
];

export default menuItems;