import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "../layout/root/Layout.jsx";
import DashboardMain from "../layout/dashboard/DashboardMain.jsx";
import ClientsMain from "../layout/clients/ClientsMain.jsx";
import AddClientPage from "../layout/clients/pages/AddClientPage.jsx";
import EditClientPage from "../layout/clients/pages/EditClientPage.jsx";
import Checkins from "../layout/checkins/Checkins.jsx";
import NotificationsMain from "../layout/notifications/NotificationsMain.jsx";
import BillingMain from "../layout/billing/BillingMain.jsx";
import Settings from "../layout/settings/settings.jsx";
import Users from "../layout/users/users.jsx";
import ViewGeneralCheckinPage from "../layout/checkins/pages/ViewGeneralCheckinPage.jsx";
import ViewWeighingCheckinPage from "../layout/checkins/pages/ViewWeighingCheckinPage.jsx";
import GeneralCheckinsMain from "../layout/checkins/GeneralCheckinsMain.jsx";
import WeighingCheckinsMain from "../layout/checkins/WeighingCheckinsMain.jsx";
import ViewCheckinHistoryPage from "../layout/checkins/pages/ViewCheckinHistoryPage.jsx";
import TableQueryProvider from "./table-query-provider.jsx";
import CheckinHistoryMain from "../layout/checkins/CheckinHistoryMain.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            {/*dashboard*/}
            <Route path="dashboard" element={<DashboardMain />}/>

            {/*clients*/}
            <Route path="clients" element={
                <TableQueryProvider>
                    <ClientsMain />
                </TableQueryProvider>
            }/>
            <Route path="clients/edit/:id" element={<EditClientPage />}/>
            <Route path="clients/add" element={<AddClientPage />}/>

            {/*checkins*/}
            <Route path="checkins" element={<Checkins />}/>
            <Route path="checkins/general" element={
                <TableQueryProvider>
                    <GeneralCheckinsMain/>
                </TableQueryProvider>
            }/>
            <Route path="checkins/weighing" element={
                <TableQueryProvider>
                    <WeighingCheckinsMain/>
                </TableQueryProvider>}
            />
            <Route path="checkins/general/history/:id" element={
                <TableQueryProvider>
                    <CheckinHistoryMain type={"general"} />
                </TableQueryProvider>
            }/>
            <Route path="checkins/weighing/history/:id" element={
                <TableQueryProvider>
                    <CheckinHistoryMain type={"weighing"} />
                </TableQueryProvider>
            }/>
            {/*<Route path="checkins/:id" element={<CheckinManager/>}/>*/}

            {/*notifications*/}
            <Route path="notifications" element={<NotificationsMain />}/>

            {/*accounts*/}
            <Route path="billing" element={
                <TableQueryProvider>
                    <BillingMain />
                </TableQueryProvider>
            }/>
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
