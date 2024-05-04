import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { JobResponse } from "../../hooks/job";
import { icons } from "../../utils/icons"
import { postDate } from "../../utils/postDate";
import { useAuth } from "../../providers/AuthProvider";
import { useBookmarkByJob, useBookmarkCreate, useBookmarkDelete } from "../../hooks/bookmark";

type Props = {
  job: JobResponse
}
function JobCard({ job }: Props) {
  const { user } = useAuth()
  const { bookmark } = useBookmarkByJob(job?.id)
  const { createBookmark } = useBookmarkCreate();
  const { deleteBookmark } = useBookmarkDelete();
  const navigate = useNavigate();

  const handleBookmark = async () => {
    if (!bookmark) {
      await createBookmark({ job_id: job.id })
    } else {
      await deleteBookmark(bookmark.id)
    }
  }
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
      minH="250px"
      display="flex"
      flexDirection="column"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4} gap={4}>
        <Text size="xs" fontWeight="bold" color="teal.600">{job.title}</Text>
        {
          user?.user_role === "seeker"
          &&
          <IconButton
            variant="ghost"
            size="sm"
            color="teal.500"
            _hover={{ color: "teal.600" }}
            icon={bookmark ? <icons.bookMarked /> : <icons.bookMark />}
            aria-label="bookmark"
            onClick={handleBookmark}
          />
        }
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
            onClick={() => navigate(`/job/${job.id}`)}
          >
            Details
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default JobCard;
