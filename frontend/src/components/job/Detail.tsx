import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Icon,
  Stack,
  Divider,
  Tag,
  TagLabel,
  AbsoluteCenter,
  Link,
} from '@chakra-ui/react';
import { FaMoneyBillWave } from 'react-icons/fa';
import { JobResponse } from '../../hooks/job';
import { useCompanyByUserId } from '../../hooks/company';
import { postDate } from '../../utils/postDate';
import { PublicCompanyDetails } from '../company/PublicCompanyDetails';
import Uploader from '../UserAvatar/Uploader';
import { useAuth } from '../../providers/AuthProvider';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { ResumeRecommendation } from '../resume/ResumeRecommendation';
import { useApplicationByJob, useApplicationCreate, useApplicationDelete, useApplications } from '../../hooks/applications';
import Applicants from '../UserAvatar/Applicants';
import SimilarJobs from './SimilarJobs';

type Props = {
  job: JobResponse;
};

const Detail = ({ job }: Props) => {

  const { company, isLoading } = useCompanyByUserId(job.user);
  const { application, setApplication } = useApplicationByJob(job.id)
  const { applications } = useApplications(job.id)
  const { createApplication } = useApplicationCreate()
  const { deleteApplication } = useApplicationDelete()
  const { user } = useAuth()

  const handleApply = async () => {
    if (application) {
      await deleteApplication(application.id)
      setApplication(undefined)
    } else {
      const res = await createApplication({ job_id: job.id })
      setApplication(res?.data)
    }
  }

  return (
    <Flex w="80%" my="2%" direction="column">
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Box flex="2.5" pr={{ base: 0, md: 8 }}>
          <Heading as="h2" size="lg" mb={4} color="teal.600">
            {job.title}
          </Heading>
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Text fontSize="sm" color="gray.600">
                {`Posted ${postDate(job.created_at)}`}
              </Text>
              {job.job_file && (
                <Link href={job.job_file} textDecoration="underline" fontSize="sm" textColor="blue.600" isExternal>
                  Job File <ExternalLinkIcon mx='2px' />
                </Link>
              )}
            </Box>
            {
              user?.user_role === "seeker"
              &&
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={handleApply}
              >
                {application ? "Applied" : "Apply"}
              </Button>
            }
          </Flex>
          <Flex alignItems="center" mb={4}>
            <Icon as={FaMoneyBillWave} color="teal.600" mr={2} />
            <Text fontWeight="bold" fontSize="sm">{`${Math.floor(job.min_salary)} - ${Math.floor(job.max_salary)}`}</Text>
          </Flex>
          <Text fontWeight="bold" mb={4} fontSize="xs" color="gray.600">
            Deadline: {job.deadline}
          </Text>
          <Text mb={6} color="gray.700" fontSize="small">
            {job.summary}
          </Text>
          <Divider my={6} />
          <Box>
            <Heading as="h4" size="md" mb={4} color="teal.600">
              Description
            </Heading>
            <Text mb={6} color="gray.700" fontSize="medium">
              {job.description}
            </Text>
          </Box>
          <Divider my={6} />
          <Stack spacing={6}>
            <Box>
              <Heading as="h3" size="sm" mb={2} color="teal.600">
                Experience:
              </Heading>
              <Flex flexWrap="wrap" gap={2}>
                {job.experience && job.experience.length !== 0
                  ? job.experience.map((exp, index) => (
                    <Tag size="md" key={index} variant='outline' textColor="black" colorScheme='teal'>
                      <TagLabel>{exp}</TagLabel>
                    </Tag>
                  ))
                  : <Text color="gray.500">No Experience</Text>}
              </Flex>
            </Box>
            <Box>
              <Heading as="h3" size="sm" mb={2} color="teal.600">
                Qualifications:
              </Heading>
              <Flex flexWrap="wrap" gap={2}>
                {job.qualification && job.qualification.length !== 0
                  ? job.qualification.map((qual, index) => (
                    <Tag size="md" key={index} variant='outline' textColor="black" colorScheme='teal'>
                      <TagLabel>{qual}</TagLabel>
                    </Tag>
                  ))
                  : <Text color="gray.500">No Qualifications</Text>}
              </Flex>
            </Box>
            <Box>
              <Heading as="h3" size="sm" mb={2} color="teal.600">
                Skills:
              </Heading>
              <Flex flexWrap="wrap" gap={2}>
                {job.skills && job.skills.length !== 0
                  ? job.skills.map((skill, index) => (
                    <Tag size="md" key={index} variant='outline' textColor="black" colorScheme='teal'>
                      <TagLabel>{skill}</TagLabel>
                    </Tag>
                  ))
                  : <Text color="gray.500">No Skills</Text>}
              </Flex>
            </Box>
          </Stack>
        </Box>
        <Divider orientation='vertical' />
        <Box flex="1" mt={{ base: 8, md: 0 }}>
          <Uploader id={job.user} />
          <PublicCompanyDetails company={company} isLoading={isLoading} />
        </Box>
      </Flex>
      <Box position='relative' padding='10'>
        <Divider />
        <AbsoluteCenter bg='white' px='4'>
          END
        </AbsoluteCenter>
      </Box>
      {
        user?.user_role === "recruiter" ?
          <>
            {
              applications && applications.length !== 0 && <Applicants applications={applications} />
            }
            <ResumeRecommendation id={job.id} />
          </>
          :
          <SimilarJobs id={job.id} />
      }
    </Flex>
  );
};

export default Detail;