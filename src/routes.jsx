import Dashboard from "./layout/dashboard/dashboard.jsx";
import Clients from "./layout/clients/clients.jsx";
import Checkins from "./layout/checkins/checkins.jsx";
import Billing from "./layout/billing/billing.jsx";

import Icon from "@mui/material/Icon";

const routes = [
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize={"small"}></Icon>,
        route: "/dashboard",
        component: <Dashboard/>
    },
    {
        type: "collapse",
        name: "Clients",
        key: "clients",
        icon: <Icon fontSize={"small"}></Icon>,
        route: "/clients",
        component: <Clients/>
    },
    {
        type: "collapse",
        name: "Check-ins",
        key: "checkins",
        icon: <Icon fontSize={"small"}></Icon>,
        route: "/checkins",
        component: <Checkins/>
    },
    {
        type: "collapse",
        name: "Billing",
        key: "billing",
        icon: <Icon fontSize={"small"}></Icon>,
        route: "/billing",
        component: <Billing/>
    }
];

export default routes;