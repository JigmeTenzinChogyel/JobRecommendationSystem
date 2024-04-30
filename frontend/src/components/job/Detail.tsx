import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  ListItem,
  UnorderedList,
  Button,
  Icon,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { FaClock, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useJob from '../../hooks/useJob';
import Loading from '../../pages/Loading';

const Detail: React.FC = () => {
  const param = useParams()
  const id = parseInt(param.id || "")
  const { job, isLoading } = useJob({id});

  if(isLoading) {
    return <Loading />
  }

  return (
    <Box maxW="800px" mx="auto" p={6}>
      <Heading as="h1" size="xl" mb={4}>
        {job.title}
      </Heading>
      <Text mb={4}>{job.description}</Text>

      <Flex alignItems="center" mb={4}>
        <Icon as={FaMapMarkerAlt} mr={2} />
        <Text fontWeight="bold">{job.location}</Text>
      </Flex>

      <Flex alignItems="center" mb={4}>
        <Icon as={FaMoneyBillWave} mr={2} />
        <Text fontWeight="bold">${job.salary}</Text>
      </Flex>

      <Flex alignItems="center" mb={4}>
        <Icon as={FaClock} mr={2} />
        <Text fontWeight="bold">Deadline: {job.deadline}</Text>
      </Flex>

      <Divider my={6} />

      <Heading as="h2" size="md" mb={4}>
        Requirements
      </Heading>

      <Stack spacing={4}>
        <Box>
          <Text fontWeight="bold" mb={2}>
            Experience:
          </Text>
          <UnorderedList>
            {job.experience.map((exp, index) => (
              <ListItem key={index}>{exp}</ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Box>
          <Text fontWeight="bold" mb={2}>
            Skills:
          </Text>
          <UnorderedList>
            {job.skills.map((skill, index) => (
              <ListItem key={index}>{skill}</ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Box>
          <Text fontWeight="bold" mb={2}>
            Qualifications:
          </Text>
          <UnorderedList>
            {job.qualification.map((qual, index) => (
              <ListItem key={index}>{qual}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Stack>

      <Divider my={6} />

      {job.job_file && (
        <Box mb={6}>
          <Text fontWeight="bold" mb={2}>
            Job File:
          </Text>
          <Button as="a" href={job.job_file} target="_blank" colorScheme="blue">
            View File
          </Button>
        </Box>
      )}

      <Button colorScheme="blue">Apply Now</Button>
    </Box>
  );
};

export default Detail;