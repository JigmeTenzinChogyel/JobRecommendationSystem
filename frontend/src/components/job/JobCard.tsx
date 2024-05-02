import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { JobResponse } from "../../hooks/job";
import { icons } from "../../utils/icons"
import { postDate } from "../../utils/postDate";

type Props = {
  job?: JobResponse
  bookmark?: boolean
  handleBookmark?(): void
}
function JobCard({ job, bookmark, handleBookmark }: Props) {
  const navigate = useNavigate();

  if (!job) return;

  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="md"
      p={6}
      cursor="pointer"
      position="relative"
      transition="transform 0.3s ease"
      _hover={{ transform: "translateY(-3px)" }}
      // minW="200px"
      // maxW="300px"
      minH="250px"
      // maxH="250px"
      display="flex"
      flexDirection="column"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4} gap={4}>
        <Text size="xs" fontWeight="bold" color="teal.600">{job.title}</Text>
        <IconButton
          variant="ghost"
          size="sm"
          color="teal.500"
          _hover={{ color: "teal.600" }}
          icon={bookmark ? <icons.bookMarked /> : <icons.bookMark />}
          aria-label="bookmark"
          onClick={handleBookmark}
        />
      </Flex>
      <Text
        mb={2}
        noOfLines={[2, 3]}
        color="gray.700"
        fontSize="xs"
        flex="1 0 auto"
      >
        {job.summary}
      </Text>
      <Box mt="auto">
        <Text mb={4} color="gray.700" fontSize="xs" fontWeight="bold">
          Salary: {`${Math.floor(job.min_salary)} - ${Math.floor(job.max_salary)}`}
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" color="gray.500">{postDate(job.created_at)}</Text>
          <Button
            colorScheme="teal"
            variant="solid"
            size="xs"
            _hover={{ bg: "teal.600" }}
            onClick={() => navigate(`${job.id}`)}
          >
            Details
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default JobCard;
