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
import {icons} from "../../utils/icons"
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
          {job.title}
        </Heading>
        {
          bookmark 
          &&
          <IconButton
          variant="ghost"
          size="sm"
          color="teal.500"
          _hover={{ color: "teal.600" }}
          icon={bookmark ? <icons.bookMarked /> : <icons.bookMark />}
          aria-label="bookmark"
          onClick={ handleBookmark }
        />
        }
      </Flex>
      <Text
        mb={2}
        noOfLines={[2, 3, 4]}
        color="gray.700"
        fontSize="sm"
        flex="1 0 auto"
      >
        {job.summary}
      </Text>
      <Box mt="auto">
        <Text mb={4} color="gray.700" fontSize="sm" fontWeight="bold">
          Salary: {`${Math.floor(job.min_salary)} - ${Math.floor(job.max_salary)}`}
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.500">{postDate(job.created_at)}</Text>
          <Button
            colorScheme="teal"
            variant="solid"
            size="sm"
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
