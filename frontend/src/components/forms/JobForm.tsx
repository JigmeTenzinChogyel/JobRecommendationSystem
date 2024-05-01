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
} from '@chakra-ui/react';
import { JobCreate, useJobCreate } from '../../hooks/job';
import "./form.css"
import Loading from '../../pages/Loading';

function JobForm() {

  const { createJob, isLoading } = useJobCreate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<JobCreate>();

  const onSubmit = async (values: JobCreate) => {
    console.log(values);
    await createJob(values)
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired mb={4} isInvalid={!!errors.title}>
          <FormLabel htmlFor="title">Job Title</FormLabel>
          <Input
            id="title"
            type="text"
            {...register('title', {
              required: 'Job title is required',
            })}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired mb={4} isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Job Description</FormLabel>
          <Textarea
            id="description"
            {...register('description', {
              required: 'Job description is required',
            })}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <Flex mb={4}>
          <FormControl isRequired mr={4} isInvalid={!!errors.min_salary}>
            <FormLabel htmlFor="min_salary">Minimum Salary</FormLabel>
            <Input
              id="min_salary"
              type="number"
              {...register('min_salary', {
                required: 'Minimum salary is required',
              })}
            />
            <FormErrorMessage>{errors.min_salary?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.max_salary}>
            <FormLabel htmlFor="max_salary">Maximum Salary</FormLabel>
            <Input
              id="max_salary"
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
          <FormErrorMessage>{errors.deadline?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={6} isInvalid={!!errors.job_file}>
          <FormLabel htmlFor="job_file">Job File</FormLabel>
          <Input
            id="job_file"
            type="file"
            {...register('job_file', {
              required: 'Job file is required',
            })}
          />
          <FormErrorMessage>{errors.job_file?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          loadingText="Submitting"
        >
          Submit Job
        </Button>
      </form>
    </Box>
  );
}

export default JobForm;