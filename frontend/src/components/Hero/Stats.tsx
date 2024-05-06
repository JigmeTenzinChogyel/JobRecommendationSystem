import { Stat, StatGroup, StatLabel, StatNumber, Box } from "@chakra-ui/react"

export const Stats = () => {
  return (
    <Box
      bg="gray.800"
      borderRadius="md"
      p={6}
      boxShadow="lg"
    >
      <StatGroup>
        <Stat>
          <StatLabel fontSize="sm" color="gray.400" fontWeight="medium" mb={1}>
            Sent
          </StatLabel>
          <StatNumber fontSize="3xl" fontWeight="bold" color="white">
            345,670
          </StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  )
}