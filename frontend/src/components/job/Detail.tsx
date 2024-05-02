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
  IconButton,
} from '@chakra-ui/react';
import { FaMoneyBillWave } from 'react-icons/fa';
import { JobResponse } from '../../hooks/job';
import { useCompanyByUserId } from '../../hooks/company';
import Loading from '../../pages/Loading';
import { postDate } from '../../utils/postDate';
import { icons } from '../../utils/icons';
import { PublicCompanyDetails } from '../company/PublicCompanyDetails';

type Props = {
  job: JobResponse;
};

const Detail = ({ job }: Props) => {
  const { company, isLoading } = useCompanyByUserId(job.user);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex w="80%" direction={{ base: 'column', md: 'row' }} justify="space-between" my="2%">
      <Box flex="2.5" pr={{ base: 0, md: 8 }}>
        <Heading as="h1" size="xl" mb={4} color="teal.600">
          {job.title}
        </Heading>
        <Flex justify="space-between" align="center" mb={6}>
          <Text fontSize="sm" color="gray.600">
            {`Posted ${postDate(job.created_at)}`}
          </Text>
          <Flex>
            {job.job_file && (
              <Box mr={4}>
                <IconButton
                  aria-label="attachment"
                  icon={<icons.attach />}
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => window.open(job.job_file, '_blank')}
                />
              </Box>
            )}
            <Button colorScheme="teal" variant="outline">
              Apply Now
            </Button>
          </Flex>
        </Flex>
        <Flex alignItems="center" mb={4}>
          <Icon as={FaMoneyBillWave} color="teal.600" mr={2} />
          <Text fontWeight="bold">{`${Math.floor(job.min_salary)} - ${Math.floor(job.max_salary)}`}</Text>
        </Flex>
        <Text fontWeight="bold" mb={4} color="gray.600">
          Deadline: {job.deadline}
        </Text>
        <Text mb={6} color="gray.700">
          {job.summary}
        </Text>
        <Divider my={6} />
        <Box>
          <Heading as="h2" size="md" mb={4} color="teal.600">
            Description
          </Heading>
          <Text mb={6} color="gray.700">
            {job.description}
          </Text>
        </Box>
        <Divider my={6} />
        <Stack spacing={6}>
          <Box>
            <Heading as="h3" size="sm" mb={2} color="teal.600">
              Experience:
            </Heading>
            <UnorderedList spacing={2}>
              {job.experience && job.experience.length !== 0
                ? job.experience.map((exp, index) => (
                  <ListItem key={index} color="gray.700">
                    {exp}
                  </ListItem>
                ))
                : <Text color="gray.500">No Experience</Text>}
            </UnorderedList>
          </Box>
          <Box>
            <Heading as="h3" size="sm" mb={2} color="teal.600">
              Qualifications:
            </Heading>
            <UnorderedList spacing={2}>
              {job.qualification && job.qualification.length !== 0
                ? job.qualification.map((qual, index) => (
                  <ListItem key={index} color="gray.700">
                    {qual}
                  </ListItem>
                ))
                : <Text color="gray.500">No Qualifications</Text>}
            </UnorderedList>
          </Box>
          <Box>
            <Heading as="h3" size="sm" mb={2} color="teal.600">
              Skills:
            </Heading>
            <UnorderedList spacing={2}>
              {job.skills && job.skills.length !== 0
                ? job.skills.map((skill, index) => (
                  <ListItem key={index} color="gray.700">
                    {skill}
                  </ListItem>
                ))
                : <Text color="gray.500">No Skills</Text>}
            </UnorderedList>
          </Box>
        </Stack>
      </Box>
      <Divider orientation='vertical' />
      <Box flex="1" mt={{ base: 8, md: 0 }}>
        <PublicCompanyDetails company={company} isLoading={isLoading}/>
      </Box>
    </Flex>
  );
};

export default Detail;