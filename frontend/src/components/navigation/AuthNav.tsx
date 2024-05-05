import { Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { BellIcon } from "@chakra-ui/icons";
import Loading from "../../pages/Loading";
import UserAvatar from "../UserAvatar/UserAvatar";
import NavDrawer from "./NavDrawer";
import useLogout from "../../auth/useLogout";
import {
    Link as ReactRouterLink,
    useNavigate,
  } from "react-router-dom";
  import { Link as ChakraLink } from "@chakra-ui/react";
import useScroll from "../../hooks/useScroll";
import { useAuth } from "../../providers/AuthProvider";

function AuthNav() {

    const navigate = useNavigate()
    const { isScrolled } = useScroll();
    const { logout } = useLogout();
    const { user, isLoading } = useAuth()

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

        {/* User Avatar, Notification, and Logout */}
        <Flex align="center" display={{ base: "none", md: "flex" }} >
          <IconButton aria-label="Notifications" variant='none' _hover={{ background: "#222b43" }} onClick={() => navigate("/notification")} icon={<BellIcon w={6} h={6} />} mr={2} />
          <Menu>
            <MenuButton cursor="pointer" px={3} py={1} _hover={{ background: "#222b43" }} borderRadius='md'>
              {
                isLoading ?
                  <Loading />
                  :
                  <UserAvatar name={user?.name} role={user?.user_role} src={user?.avatar} />
              }
            </MenuButton>
            <MenuList textColor='black'>
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              {
                user?.user_role === "seeker" && <MenuItem onClick={() => navigate("/bookmark")}>Bookmarks</MenuItem>
              }
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

export default AuthNav;