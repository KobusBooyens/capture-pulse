import React from "react";
import Box from "../../../components/Box/Box.jsx";
import Header from "../components/Header.jsx";
import Subscription from "../components/Tabs/Subscription.jsx";
import Packages from "../components/Tabs/Packages.jsx";
import Goals from "../components/Tabs/Goals.jsx";

const ViewSettingsPage = () => {

    const menuItems = [
        { tab: 0, label: "Subscription", icon: "assignment_id" },
        { tab: 1, label: "Packages", icon: "inventory_2" },
        { tab: 2, label: "Goals", icon: "flag" },
    ];

    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleTabChange = (newTab) => {
        setSelectedTab(newTab);
    };

    const renderContent = () => {
        switch (selectedTab) {
        case 0:
            return <Subscription />;
        case 1:
            return <Packages />;
        case 2:
            return <Goals />;
        default:
            return null;
        }
    };

    return (
        <Box pt={6} pb={3}>
            <Header menuItems={menuItems} onTabChange={handleTabChange}>
                {renderContent()}
            </Header>
        </Box>
    );
};
export default ViewSettingsPage;
