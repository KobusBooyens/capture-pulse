import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "../layout/root/Layout.jsx";
import Dashboard from "../layout/dashboard/dashboard.jsx";
import Clients from "../layout/clients/Clients.jsx";
import AddClientPage from "../layout/clients/pages/AddClientPage.jsx";
import EditClientPage from "../layout/clients/pages/EditClientPage.jsx";
import Checkins from "../layout/checkins/checkins.jsx";
import Notifications from "../layout/notifications/notifications.jsx";
import Billing from "../layout/billing/billing.jsx";
import Settings from "../layout/settings/settings.jsx";
import Users from "../layout/users/users.jsx";
import GeneralCheckin from "../layout/checkins/pages/generalCheckin.jsx";
import WeighingCheckin from "../layout/checkins/pages/weighingCheckin.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            {/*dashboard*/}
            <Route path="dashboard" element={<Dashboard />}/>

            {/*clients*/}
            <Route path="clients" element={<Clients />}/>
            <Route path="clients/edit/:id" element={<EditClientPage />}/>
            <Route path="clients/add" element={<AddClientPage />}/>

            {/*checkins*/}
            <Route path="checkins" element={<Checkins />}/>
            <Route path="checkins/general" element={<GeneralCheckin />}/>
            <Route path="checkins/weighing" element={<WeighingCheckin />}/>
            {/*<Route path="checkins/:id" element={<CheckinManager/>}/>*/}

            {/*notifications*/}
            <Route path="notifications" element={<Notifications />}/>

            {/*accounts*/}
            <Route path="billing" element={<Billing />}/>
            {/*<Route path="billing/:id" element={<BillingManger/>}/>*/}

            {/*users*/}
            <Route path="users" element={<Users />}/>

            {/*settings*/}
            <Route path="settings" element={<Settings />}/>
        </Route>
    )
);

const RoutingProvider = () => {
    return <RouterProvider router={router}/>;
};

export default RoutingProvider;
