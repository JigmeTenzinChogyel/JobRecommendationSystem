import { useForm } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  FormErrorMessage,
  Heading,
  Text,
  FormHelperText,
  Divider,
} from '@chakra-ui/react';
import { JobCreate, useJobCreate } from '../../hooks/job';
import "./form.css"
import Loading from '../../pages/Loading';
import { useNavigate } from 'react-router-dom';

function JobForm() {

  const { createJob, isLoading } = useJobCreate();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<JobCreate>();

  const onSubmit = async (values: JobCreate) => {
    await createJob({ ...values, job_file: values.job_file[0] })
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <Flex justify="center" px="5%" pt="3%" pb="4%" w={{ base: "100%", md: "60%" }} direction="column" gap={5}>
      <Box>
        <Heading textColor="teal">Job Details</Heading>
        <Text as="i" fontSize="sm" textColor="gray.500">Describe the role and responsibilites of the position</Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" maxW="">
          <FormControl isRequired mb={4} isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Job Title</FormLabel>
            <Input
              id="title"
              type="text"
              placeholder='e.g. Senior Developer'
              {...register('title', {
                required: 'Job title is required',
              })}
            />
            <FormHelperText>Please enter the official title of the job position. Make sure it accurately reflects the role and responsibilities.</FormHelperText>
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired mb={4} isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Summary</FormLabel>
            <Input
              id="summary"
              type="text"
              max={300}
              {...register('summary', {
                required: 'Job summary is required',
              })}
            />
            <FormHelperText>Please provide a brief summary of the job position.</FormHelperText>
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <Divider my={5} />

          <FormControl isRequired mb={4} isInvalid={!!errors.description}>
            <FormLabel htmlFor="description">Job Description</FormLabel>
            <Textarea
              id="description"
              rows={11}
              {...register('description', {
                required: 'Job description is required',
              })}
            />
            <FormHelperText>Provide a detailed description of the job responsibilities, qualifications, and any other relevant information.</FormHelperText>
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>

          <Divider my={5} />

          <Flex mb={4}>
            <FormControl isRequired mr={4} isInvalid={!!errors.min_salary}>
              <FormLabel htmlFor="min_salary">Minimum Salary / Month</FormLabel>
              <Input
                id="min_salary"
                placeholder='e.g. 25000'
                type="number"
                {...register('min_salary', {
                  required: 'Minimum salary is required',
                })}
              />
              <FormErrorMessage>{errors.min_salary?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.max_salary}>
              <FormLabel htmlFor="max_salary">Maximum Salary / Month</FormLabel>
              <Input
                id="max_salary"
                placeholder='e.g. 30000'
                type="number"
                {...register('max_salary', {
                  required: 'Maximum salary is required',
                })}
              />
              <FormErrorMessage>{errors.max_salary?.message}</FormErrorMessage>
            </FormControl>
          </Flex>

          <FormControl isRequired mb={4} isInvalid={!!errors.deadline}>
            <FormLabel htmlFor="deadline">Application Deadline</FormLabel>
            <Input
              id="deadline"
              type="date"
              {...register('deadline', {
                required: 'Application deadline is required',
              })}
            />
            <FormHelperText> Enter the deadline by which applicants must submit their applications.</FormHelperText>
            <FormErrorMessage>{errors.deadline?.message}</FormErrorMessage>
          </FormControl>

          <Divider my={5} />

          <FormControl mb={6} isInvalid={!!errors.job_file}>
            <FormLabel htmlFor="job_file">Job File</FormLabel>
            <Input
              id="job_file"
              type="file"
              {...register('job_file')}
            />
            <FormHelperText>Attach any relevant documents that applicants may need to review or fill out.</FormHelperText>
            <FormErrorMessage>{errors.job_file?.message}</FormErrorMessage>
          </FormControl>
          <Flex w="100%" justify="right" gap={4}>
            <Button
              type="submit"
              colorScheme="teal"
              w="15%"
              variant="outline"
            >
              Submit Job
            </Button>
            <Button
              type="button"
              colorScheme="red"
              w="15%"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export default JobForm;