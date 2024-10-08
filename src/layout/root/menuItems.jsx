import DashboardMain from "../dashboard/DashboardMain.jsx";
import ClientsMain from "../clients/ClientsMain.jsx";
import CheckinsMain from "../checkins/CheckinsMain.jsx";
import BillingMain from "../billing/BillingMain.jsx";

import Icon from "@mui/material/Icon";
import NotificationsMain from "../notifications/NotificationsMain.jsx";
import SettingsMain from "../settings/SettingsMain.jsx";
import UsersMain from "../users/UsersMain.jsx";
import GeneralCheckinsMain from "../checkins/GeneralCheckinsMain.jsx";
import WeighingCheckinsMain from "../checkins/WeighingCheckinsMain.jsx";
import MembershipMain from "../managePackages/MembershipMain.jsx";

const menuItems = [
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize={"small"}>dashboard</Icon>,
        route: "/dashboard",
        component: <DashboardMain />
    },
    {
        type: "collapse",
        name: "Clients",
        key: "clients",
        icon: <Icon fontSize={"small"}>people_alt</Icon>,
        route: "/clients",
        component: <ClientsMain />
    },
    {
        type: "collapse",
        name: "Memberships",
        key: "packages",
        icon: <Icon fontSize={"small"}>card_membership</Icon>,
        route: "/memberships",
        component: <MembershipMain />
    },
    {
        type: "collapse",
        name: "Check-ins",
        key: "checkins",
        icon: <Icon fontSize={"small"}>settings_accessibility</Icon>,
        route: "/checkins",
        component: <CheckinsMain />,
        subMenuItems: [
            {
                type: "item",
                name: "General Check-in",
                key: "generalCheckin",
                icon: <Icon fontSize={"small"}>how_to_reg</Icon>,
                route: "/checkins/general",
                component: <GeneralCheckinsMain />
            },
            {
                type: "item",
                name: "Weighing",
                key: "weighing",
                icon: <Icon fontSize={"small"}>scale</Icon>,
                route: "/checkins/weighing",
                component: <WeighingCheckinsMain />
            }
        ]
    },
    {
        type: "collapse",
        name: "Billing",
        key: "billing",
        icon: <Icon fontSize={"small"}>receipt_long</Icon>,
        route: "/billing",
        component: <BillingMain />
    },
    {
        type: "collapse",
        name: "Notifications",
        key: "notifications",
        icon: <Icon fontSize={"small"}>notifications</Icon>,
        route: "/notifications",
        component: <NotificationsMain />
    },
    {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <Icon fontSize={"small"}>person</Icon>,
        route: "/users",
        component: <UsersMain />
    },
    {
        type: "collapse",
        name: "Settings",
        key: "settings",
        icon: <Icon fontSize={"small"}>settings</Icon>,
        route: "/settings",
        component: <SettingsMain />
    }
];

export default menuItems;