import { Flex, Heading, Text, Box, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Reveal } from "../animate/Reveal";

type Props = {
    imageUrl: string;
    heading: string;
    subHeading: string;
};

function Hero({ imageUrl, heading, subHeading }: Props) {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleStart = () => {
        navigate("/job")
    }

    if (pathname === "/") {
        return (
            <Flex
                minH={pathname === "/" ? "65vh" : "19vh"}
                backgroundImage={`url('${imageUrl}')`}
                backgroundSize="cover"
                backgroundPosition="center"
                justify="center"
                align="center"
                direction="column"
                position="relative"
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="rgba(0, 0, 0, 0.5)"
                    zIndex={1}
                />
                <Flex zIndex={2} color="white" p={5} align='center' justify='center' direction='column' gap={6} textAlign='center'>
                    <Box>
                        <Reveal width="100%">
                            <Heading fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                                {heading}
                            </Heading>
                        </Reveal>
                        <Reveal width="100%">
                            <Text
                                as="i"
                                fontSize={{ base: "8px", md: "xs" }}
                            >
                                {subHeading}
                            </Text>
                        </Reveal>
                    </Box>
                    {
                        pathname === "/"
                        &&
                        <Reveal>
                            <Button
                                onClick={handleStart}
                                _hover={{ backgroundColor: "gray.800" }}
                                variant='outline'
                                color='white'
                                fontSize={{ base: 'xs', md: 'sm' }}
                            >
                                Get Started
                            </Button>
                        </Reveal>
                    }
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex
            minH="19vh"
            backgroundImage={`url('${imageUrl}')`}
            backgroundSize="cover"
            backgroundPosition="center"
            justify="center"
            align="center"
            direction="column"
            position="relative"
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="rgba(0, 0, 0, 0.5)"
                zIndex={1}
            />
            <Flex zIndex={2} color="white" p={5} align='center' justify='center' direction='column' gap={6} textAlign='center'>
                <Box>
                    <Reveal width="100%">
                        <Heading fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                            {heading}
                        </Heading>
                    </Reveal>
                    <Reveal width="100%">
                        <Text
                            as="i"
                            fontSize={{ base: "8px", md: "xs" }}
                        >
                            {subHeading}
                        </Text>
                    </Reveal>
                </Box>
                {
                    pathname === "/"
                    &&
                    <Reveal>
                        <Button
                            onClick={handleStart}
                            _hover={{ backgroundColor: "gray.800" }}
                            variant='outline'
                            color='white'
                            fontSize={{ base: 'xs', md: 'sm' }}
                        >
                            Get Started
                        </Button>
                    </Reveal>
                }
            </Flex>
        </Flex>
    );
}

export default Hero;