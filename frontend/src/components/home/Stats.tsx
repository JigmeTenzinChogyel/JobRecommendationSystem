import { Box, Stat, StatGroup, StatLabel, StatNumber, Text } from "@chakra-ui/react"
import { useStats } from "../../hooks/stats"
import Loading from "../../pages/Loading";
import { useCounter } from "../../hooks/useCounter";
import { Reveal } from "../animate/Reveal";

export const Stats = () => {

    const { stats, isLoading } = useStats();
    const { count: user_count } = useCounter({ maxCount: stats?.user_count || 0 })
    const { count: job_count } = useCounter({ maxCount: stats?.job_count || 0 })
    const { count: company_count } = useCounter({ maxCount: stats?.company_count || 0 })

    if (isLoading) {
        return <Loading />
    }

    return (
        <Reveal width="100%">
            <Box p="1%">
                <Reveal width="100%">
                    <Text
                        textAlign="center"
                        fontSize={{ base: "large", md: "x-large" }}
                        fontWeight="bold"
                        mt="1%"
                        mb="2%"
                    >
                        Our results in numbers
                    </Text>
                </Reveal>
                <StatGroup flexDirection={{ base: "column", md: "row" }} textAlign="center" alignItems="center">
                    <Reveal>
                        <Stat>
                            <StatNumber fontSize="xxx-large" fontWeight="bold" textColor="teal.500">
                                {user_count}
                            </StatNumber>
                            <StatLabel fontSize="medium" color="gray.400" fontWeight="medium" mb={1}>
                                Users
                            </StatLabel>
                        </Stat>
                    </Reveal>
                    <Reveal>
                        <Stat>
                            <StatNumber fontSize="xxx-large" fontWeight="bold" textColor="teal.500">
                                {job_count}
                            </StatNumber>
                            <StatLabel fontSize="medium" color="gray.400" fontWeight="medium" mb={1}>
                                Jobs
                            </StatLabel>
                        </Stat>
                    </Reveal>
                    <Reveal>
                        <Stat>
                            <StatNumber fontSize="xxx-large" fontWeight="bold" textColor="teal.500">
                                {company_count}
                            </StatNumber>
                            <StatLabel fontSize="medium" color="gray.400" fontWeight="medium" mb={1}>
                                Companies
                            </StatLabel>
                        </Stat>
                    </Reveal>
                </StatGroup>
            </Box>
        </Reveal>
    )
}