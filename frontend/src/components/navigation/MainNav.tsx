import {
  Box,
  Flex,
  Heading,
  Center,
  Divider,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
} from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import useScroll from "../../hooks/useScroll";
import NavDrawer from "./NavDrawer";
import Navbar from "./Navbar";
import { useAuth } from "../../providers/AuthProvider";
import AuthNav from "./AuthNav";

function MainNav() {

  const { isScrolled } = useScroll();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    <div />
  }

  if (isAuthenticated) {
    return (
      <AuthNav />
    )
  }
  return (

    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px='1rem'
      py='0.5rem'
      bg={isScrolled ? "#0A142F" : "transparent"}
      textColor={isScrolled ? "teal.200" : "white"}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
    >
      {/* Logo */}
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <ChakraLink as={ReactRouterLink} to="/">
            JOBLESS
          </ChakraLink>
        </Heading>
      </Flex>

      {/* Navigation Links */}
      <Navbar desktop />

      {/* Sign In/Register Buttons */}
      <Box display={{ base: 'none', md: 'block' }}>
        <Center height='30px'>
          <ChakraLink as={ReactRouterLink} to="/login" mx={4}>
            Sign In
          </ChakraLink>
          <Divider orientation='vertical' borderColor={isScrolled ? 'teal.200' : 'white'} />
          <ChakraLink as={ReactRouterLink} to="/register" mx={4}>
            Register
          </ChakraLink>
        </Center>
      </Box>

      {/* Toggle Menu Button */}
      <NavDrawer />

    </Flex>
  );
}

export default MainNav;
