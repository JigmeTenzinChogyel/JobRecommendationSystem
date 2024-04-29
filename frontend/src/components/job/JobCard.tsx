import { Box, Flex, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { JobType } from "./JobType";

function JobCard({ title, location, salary, deadline, description }: JobType) {
    return (
        <Box
            bg="white"
            boxShadow="lg"
            borderRadius="md"
            p={6}
            cursor="pointer"
            position="relative"
            maxW={{ base: "100%", md: "600px" }}
            mx="auto"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-3px)" }}
            minH="300px"
            minW={{ base: "300px", md: "400px" }}
            display="flex"
            flexDirection="column"
        >
            <Flex justifyContent="space-between" alignItems="center" mb={4} gap={4}>
                <Heading size="md" color="teal.600">
                    {title}
                </Heading>
                <Button
                    variant="ghost"
                    size="sm"
                    color="teal.500"
                    _hover={{ color: "teal.600" }}
                >
                    <Icon as={FaBookmark} />
                </Button>
            </Flex>
            <Text
                mb={2}
                noOfLines={[2, 3, 4]}
                color="gray.700"
                fontSize="sm"
                flex="1 0 auto"
            >
                {description}
            </Text>
            <Box mt="auto">
                <Text mb={2} color="gray.600" fontSize="sm">
                    <Icon as={FaMapMarkerAlt} color="teal.500" mr={2} />
                    {location}
                </Text>
                <Text mb={4} color="gray.700" fontSize="sm" fontWeight="bold">
                    Salary: {salary}
                </Text>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="sm" color="gray.500">
                        Deadline: {`${deadline.getDate()}`}
                    </Text>
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        size="sm"
                        _hover={{ bg: "teal.600" }}
                    >
                        Details
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}

export default JobCard;