import { Box, Stat, StatGroup, StatLabel, StatNumber, Text } from "@chakra-ui/react"

export const Stats = () => {
    return (
        <Box p="1%">
            <Text
                textAlign="center"
                fontSize={{ base: "large", md: "larger" }}
                fontWeight="bold"
                mb="2%"
            >
                See Our Impact
            </Text>
            <StatGroup textAlign="center" alignContent="center" gap={2}>
                <Stat>
                    <StatLabel fontSize="medium" color="gray.400" fontWeight="medium" mb={1}>
                        Users
                    </StatLabel>
                    <StatNumber fontSize="xxx-large" fontWeight="bold" textColor="teal.500">
                        345,670
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel fontSize="medium" color="gray.400" fontWeight="medium" mb={1}>
                        Jobs
                    </StatLabel>
                    <StatNumber fontSize="xxx-large" fontWeight="bold" textColor="teal.500">
                        345,670
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel fontSize="medium" color="gray.400" fontWeight="medium" mb={1}>
                        Companies
                    </StatLabel>
                    <StatNumber fontSize="xxx-large" fontWeight="bold" textColor="teal.500">
                        345,670
                    </StatNumber>
                </Stat>
            </StatGroup>
        </Box>
    )
}