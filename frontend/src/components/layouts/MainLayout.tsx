import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import MainNav from "../navigation/MainNav";
import Footer from "../footer/Footer";

function MainLayout() {
    return (
        <Flex direction="column" minH="100vh">
            <MainNav />
            <Box flex="1 0 auto">
                <Outlet />
            </Box>
            <Footer />
        </Flex>
    );
}

export default MainLayout;