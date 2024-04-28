import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import useScroll from '../../hooks/useScroll';

function MainNav() {

    const { isScrolled } = useScroll()

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={isScrolled ? 'white' : 'white'}
      color={isScrolled ? 'teal.500' : 'black'}
      boxShadow={isScrolled ? 'md' : 'none'}
      position="sticky"
      top={0}
      left={0}
      right={0}
      zIndex={10}
    >
      {/* Logo */}
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          <ChakraLink as={ReactRouterLink} to="/">
            JOBLESS
          </ChakraLink>
        </Heading>
      </Flex>

      {/* Navigation Links */}
      <Flex
        display={{ base: 'none', md: 'flex' }}
        align="center"
        flexGrow={1}
        justifyContent="center"
      >
        <ChakraLink as={ReactRouterLink} to="/" mx={4}>
          Home
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/job" mx={4}>
          Job
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/about" mx={4}>
          About
        </ChakraLink>
      </Flex>

      {/* Sign In/Register Buttons */}
      <Box>
        <Button colorScheme="teal" variant="outline" mr={2}>
          <ChakraLink as={ReactRouterLink} to="/login" >
            Sign In
          </ChakraLink>
        </Button>
        <Button colorScheme="teal" variant="solid">
          <ChakraLink as={ReactRouterLink} to="/register">
            Register
          </ChakraLink>
        </Button>
      </Box>
    </Flex>
  );
}

export default MainNav;