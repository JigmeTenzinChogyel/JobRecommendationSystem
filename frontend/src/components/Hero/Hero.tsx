import { Flex, Heading, Text, Box } from "@chakra-ui/react";

type Props = {
    imageUrl: string
    heading: string
    subHeading: string
}

function Hero( { imageUrl, heading, subHeading }: Props ) {

    return (
        <Flex
            minH="35vh"
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
            <Box zIndex={2} color="white" textAlign='center' p={5}>
                <Heading>{heading}</Heading>
                <Text as="i" fontSize={{base: "xs", md: "sm"}}>{subHeading}</Text>
            </Box>
        </Flex>
    );
}

export default Hero;