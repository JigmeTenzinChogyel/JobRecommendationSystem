import { Flex, Icon, Text, IconButton } from "@chakra-ui/react";
import { JobType } from "./JobType";
import { FaBookmark, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function JobList({id, title, location, salary, deadline }: JobType) {
  const navigate = useNavigate();
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
        color="teal.600"
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
        Deadline: {`${deadline}`}
      </Text>
      <Flex wrap='nowrap'>
      <IconButton
        variant="ghost"
        size="sm"
        color="teal.500"
        _hover={{ color: "teal.600" }}
        icon={<FaBookmark />}
        aria-label="bookmark"
      />
      <IconButton
        variant="ghost"
        size="sm"
        color="teal.500"
        _hover={{ color: "teal.600" }}
        icon={<FaEye />}
        aria-label="details"
        onClick={() => navigate(`${id}`)}
      />
      </Flex>
    </Flex>
  );
}

export default JobList;