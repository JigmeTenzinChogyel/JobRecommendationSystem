import { Flex, Icon, Text, Button } from "@chakra-ui/react";
import { JobType } from "./JobType";
import { FaMapMarkerAlt } from "react-icons/fa";

function JobList({ title, location, salary, deadline }: JobType) {
  return (
    <Flex
      bg="white"
      boxShadow="xs"
      borderRadius="xs"
      cursor="pointer"
      p={4}
      mb={4}
      gap={5}
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      overflowX="auto"
    >
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          mr={4}
          whiteSpace="nowrap"
        >
          {title}
        </Text>
        <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }} mr={4} whiteSpace="nowrap">
          <Icon as={FaMapMarkerAlt} color="teal.500" mr={2} />
          {location}
        </Text>
        <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }} mr={4} whiteSpace="nowrap">
          Salary: {salary}
        </Text>
        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" whiteSpace="nowrap">
          Deadline: {`${deadline.getDate()}`}
        </Text>
      <Button colorScheme="teal" size="sm" minWidth='10em'>
        View Details
      </Button>
    </Flex>
  );
}

export default JobList;