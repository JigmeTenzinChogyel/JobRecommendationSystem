import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import MainNav from "../navigation/MainNav";
import Footer from "../footer/Footer";
import HeroWrapper from "../Hero/HeroWrapper";

function MainLayout() {
    return (
        <Flex direction="column" minH="100vh">
            <MainNav />
                <HeroWrapper>
                    <Flex flex="1 0 auto" justify="center"> 
                        <Outlet />
                    </Flex>
                </HeroWrapper>
            <Footer />
        </Flex>
    );
}

export default MainLayout;