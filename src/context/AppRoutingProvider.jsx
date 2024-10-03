import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider,
} from "react-router-dom";
import AppLayout from "../layout/root/AppLayout.jsx";
import DashboardMain from "../layout/dashboard/DashboardMain.jsx";
import ClientsMain from "../layout/clients/ClientsMain.jsx";
import AddClientPage from "../layout/clients/pages/AddClientPage.jsx";
import EditClientPage from "../layout/clients/pages/EditClientPage.jsx";
import CheckinsMain from "../layout/checkins/CheckinsMain.jsx";
import NotificationsMain from "../layout/notifications/NotificationsMain.jsx";
import BillingMain from "../layout/billing/BillingMain.jsx";
import SettingsMain from "../layout/settings/SettingsMain.jsx";
import UsersMain from "../layout/users/UsersMain.jsx";
import GeneralCheckinsMain from "../layout/checkins/GeneralCheckinsMain.jsx";
import WeighingCheckinsMain from "../layout/checkins/WeighingCheckinsMain.jsx";
import TableQueryProvider from "./TableQueryProvider.jsx";
import CheckinHistoryMain from "../layout/checkins/CheckinHistoryMain.jsx";
import BillingHistoryMain from "../layout/billing/BillingHistoryMain.jsx";
import SignUpMain from "../layout/authentication/sign-up/SignUpMain.jsx";
import SignInMain from "../layout/authentication/sign-in/SignInMain.jsx";
import CoverLayout from "../layout/root/CoverLayout.jsx";
import { useAuth } from "./AuthProvider.jsx";
import Fallback from "../layout/root/fallback/Fallback.jsx";

const ProtectedRoute = () => {
    const { authToken } = useAuth();
    return authToken ? <Outlet/> : <Navigate to={"authentication/sign-in"}/>;
};

const authenticationRoutes =
  <Route path="/" element={<CoverLayout />}>
      <Route path="authentication/sign-in" element={<SignInMain />} />
  </Route>;

const coverRoutes =
  <Route path="/" element={<CoverLayout />}>
      <Route path="authentication/sign-up" element={<SignUpMain />} />
  </Route>;

const appRoutes =
  <Route element={<ProtectedRoute/>}>
      <Route path="/" element={<AppLayout />}>

          {/* Dashboard */}
          <Route path="dashboard" element={<DashboardMain />} />

          {/* Clients */}
          <Route path="clients" element={
              <TableQueryProvider>
                  <ClientsMain />
              </TableQueryProvider>
          }/>
          <Route path="clients/edit/:id" element={<EditClientPage />} />
          <Route path="clients/add" element={<AddClientPage />} />

          {/* Checkins */}
          <Route path="checkins" element={<CheckinsMain />} />
          <Route path="checkins/general" element={
              <TableQueryProvider>
                  <GeneralCheckinsMain />
              </TableQueryProvider>
          }/>
          <Route path="checkins/weighing" element={
              <TableQueryProvider>
                  <WeighingCheckinsMain />
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

          {/* Billing */}
          <Route path="billing" element={
              <TableQueryProvider>
                  <BillingMain />
              </TableQueryProvider>
          }/>
          <Route path={"billing/history/:id"} element={
              <TableQueryProvider>
                  <BillingHistoryMain />
              </TableQueryProvider>
          }/>

          {/* Notifications */}
          <Route path="notifications" element={<NotificationsMain />} />

          {/* UsersMain */}
          <Route path="users" element={
              <TableQueryProvider>
                  <UsersMain />
              </TableQueryProvider>
          } />

          {/* SettingsMain */}
          <Route path="settings" element={<SettingsMain />} />
      </Route>

      {/*<Route path="/" element={<ProtectedRoute/>} />*/}
  </Route>
;

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {coverRoutes}
            {authenticationRoutes}
            {appRoutes}
        </>
    )
);

const AppRoutingProvider = () => {
    return <RouterProvider router={router} fallbackElement={<Fallback />}/>;
};

export default AppRoutingProvider;
