import { Flex } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useLocation, Link as ReactRouterLink } from "react-router-dom";

type Props = {
    desktop?: boolean
    isAuthenticated?: boolean
}
function Navbar({ desktop, isAuthenticated }: Props) {

    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <Flex
            display={desktop ? { base: "none", md: "flex" } : "flex"}
            align="center"
            flexGrow={1}
            gap={3}
            justifyContent="center"
            flexDirection={{ base: "column", md: "row" }}
        >
            <ChakraLink
                as={ReactRouterLink}
                to="/"
                mx={4}
                my={2}
                textDecoration={isActive("/") ? "underline" : "inherit"}
                fontWeight={isActive("/") ? "bold" : "normal"}
            >
                Home
            </ChakraLink>
            <ChakraLink
                as={ReactRouterLink}
                to="/job"
                mx={4}
                my={2}
                textDecoration={isActive("/job") ? "underline" : "inherit"}
                fontWeight={isActive("/job") ? "bold" : "normal"}
            >
                Job
            </ChakraLink>
            <ChakraLink
                as={ReactRouterLink}
                to="/employer"
                mx={4}
                my={2}
                textDecoration={isActive("/employer") ? "underline" : "inherit"}
                fontWeight={isActive("/employer") ? "bold" : "normal"}
            >
                Employer
            </ChakraLink>
            <ChakraLink
                as={ReactRouterLink}
                to="/about"
                mx={4}
                my={2}
                textDecoration={isActive("/about") ? "underline" : "inherit"}
                fontWeight={isActive("/about") ? "bold" : "normal"}
            >
                About
            </ChakraLink>
            <ChakraLink
                as={ReactRouterLink}
                to="/faq"
                mx={4}
                my={2}
                textDecoration={isActive("/faq") ? "underline" : "inherit"}
                fontWeight={isActive("/faq") ? "bold" : "normal"}
            >
                FAQ
            </ChakraLink>
            {
                isAuthenticated &&
                <>
                    <ChakraLink
                        as={ReactRouterLink}
                        to="/profile"
                        mx={4}
                        my={2}
                        textDecoration={isActive("/profile") ? "underline" : "inherit"}
                        fontWeight={isActive("/profile") ? "bold" : "normal"}
                    >
                        Profile
                    </ChakraLink>
                    <ChakraLink
                        as={ReactRouterLink}
                        to="/notification"
                        mx={4}
                        my={2}
                        textDecoration={isActive("/notification") ? "underline" : "inherit"}
                        fontWeight={isActive("/notification") ? "bold" : "normal"}
                    >
                        Notification
                    </ChakraLink>
                </>
            }
        </Flex>
    )
}

export default Navbar;