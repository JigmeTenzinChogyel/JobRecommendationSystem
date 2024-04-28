import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Button, Center, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Navbar from "./Navbar";
import useLogout from "../../auth/useLogout";

type Props = {
    isAuthenticated?: boolean
}

function NavDrawer( { isAuthenticated }: Props ) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { logout } = useLogout();
    const btnRef = React.useRef()

    if (isAuthenticated) {
        return (
            <>
            <IconButton
                aria-label="Toggle Menu"
                ref={btnRef}
                icon={<HamburgerIcon />}
                display={{ base: "block", md: "none" }}
                onClick={onOpen}
                variant='none'
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader textAlign='center'>JOBLESS</DrawerHeader>

                    <DrawerBody textAlign='center'>
                    <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' my={5} />
                        <Navbar isAuthenticated={true}/>
                    </DrawerBody>

                    <DrawerFooter>
                        <Center height='30px' w='100%'>
                            <Button onClick={() => logout()}>Log Out</Button>
                        </Center>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
        )
    }

    return (
        <>
            <IconButton
                aria-label="Toggle Menu"
                ref={btnRef}
                icon={<HamburgerIcon />}
                display={{ base: "block", md: "none" }}
                onClick={onOpen}
                variant='none'
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader textAlign='center'>JOBLESS</DrawerHeader>

                    <DrawerBody textAlign='center'>
                        <Navbar />
                    </DrawerBody>

                    <DrawerFooter>
                        <Center height='30px' w='100%'>
                            <ChakraLink as={ReactRouterLink} to="/login" mx={4}>
                                Sign In
                            </ChakraLink>
                            <Divider orientation='vertical' borderColor='teal.200' />
                            <ChakraLink as={ReactRouterLink} to="/register" mx={4}>
                                Register
                            </ChakraLink>
                        </Center>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default NavDrawer;