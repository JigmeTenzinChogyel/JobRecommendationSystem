import { Flex, Heading, Text, Box, Button } from "@chakra-ui/react";

type Props = {
    imageUrl: string;
    heading: string;
    subHeading: string;
    buttonName?: string
    handleClick?(): void
    minH?: string
};

function Hero({ imageUrl, heading, subHeading, buttonName, handleClick, minH }: Props) {
    return (
        <Flex
            minH={minH? minH : "19vh"}
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
                    <Heading fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                        {heading}
                    </Heading>
                    <Text
                        as="i"
                        fontSize={{ base: "8px", md: "xs" }}
                    >
                        {subHeading}
                    </Text>
                </Box>

                {
                    buttonName
                    &&
                    <Button
                        onClick={handleClick}
                        _hover={{ backgroundColor: "gray.500" }}
                        variant='outline'
                        color='white'
                        fontSize={{ base: 'xs', md: 'sm' }}
                    >
                        {buttonName}
                    </Button>
                }
            </Flex>
        </Flex>
    );
}

export default Hero;