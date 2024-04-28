import {
  Box,
  Flex,
  Heading,
  IconButton,
  Center,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useNavigate,
} from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import useScroll from "../../hooks/useScroll";
import NavDrawer from "./NavDrawer";
import { BellIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";
import useLogout from "../../auth/useLogout";
import { useAuth } from "../../providers/AuthProvider";

function MainNav() {

  const navigate = useNavigate()
  const { isScrolled } = useScroll();
  const { logout } = useLogout();
  const {isAuthenticated, isLoading} = useAuth(); 

  if (isLoading) {
    <div />
  }

  if (isAuthenticated) {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        bg={isScrolled ? "#0A142F" : "white"}
        color={isScrolled ? "teal.200" : "black"}
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

        {/* User Avatar, Notification, and Logout */}
        <Flex align="center" display={{ base: "none", md: "flex" }} >
          <IconButton aria-label="Notifications" variant='none' onClick={() => navigate("/notification")} icon={<BellIcon w={6} h={6} />} mr={2} />
          <Menu>
            <MenuButton as={Avatar} size="sm" cursor="pointer" />
            <MenuList textColor='black'>
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem w="100%" onClick={logout} textAlign='center'>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Toggle Menu Button */}
        <NavDrawer isAuthenticated={true} />

      </Flex>
    )
  }
  return (

    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={isScrolled ? "#0A142F" : "white"}
      color={isScrolled ? "teal.200" : "black"}
      borderBottom={isScrolled ? "1px" : ""}
      borderBottomColor={isScrolled ? "gray.200" : "white"}
      position="sticky"
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
          <Divider orientation='vertical' borderColor={isScrolled ? 'teal.200' : 'black'} />
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
