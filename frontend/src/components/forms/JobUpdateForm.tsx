import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    useColorModeValue,
    Flex,
    Heading,
} from '@chakra-ui/react';
import { JobResponse, useJobUpdate } from '../../hooks/job';
import './form.css';
import Loading from '../../pages/Loading';

type Props = {
    job: JobResponse;
};

export const JobUpdateForm = ({ job }: Props) => {
    const color = useColorModeValue('teal.600', 'teal.300');
    const [formData, setFormData] = useState(job);
    const { updateJob, isLoading } = useJobUpdate(job.id);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNumberChange = (name: string, value: number) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateJob({
            title: formData.title,
            summary: formData.summary,
            description: formData.description,
            max_salary: formData.max_salary,
            min_salary: formData.min_salary,
            deadline: formData.deadline,
        });
    };

    if (isLoading) {
        return <Loading />
    }
    return (
        <form onSubmit={handleSubmit}>
            <Flex justify="center" my="3%">
                <Flex w={{ base: '100%', md: '65%' }} direction="column" gap={4}>
                    <Heading fontSize="x-large" textColor="teal">
                        Update Job
                    </Heading>
                    <FormControl mb={4}>
                        <FormLabel color={color}>Title</FormLabel>
                        <Input name="title" defaultValue={formData.title} onChange={handleChange} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color={color}>Summary</FormLabel>
                        <Input name="summary" defaultValue={formData.summary} onChange={handleChange} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color={color}>Description</FormLabel>
                        <Textarea
                            name="description"
                            defaultValue={formData.description}
                            rows={20}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color={color}>Minimum Salary</FormLabel>
                        <NumberInput
                            defaultValue={formData.min_salary}
                            precision={2}
                            onChange={(_, value) => handleNumberChange('min_salary', value)}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color={color}>Maximum Salary</FormLabel>
                        <NumberInput
                            defaultValue={formData.max_salary}
                            precision={2}
                            onChange={(_, value) => handleNumberChange('max_salary', value)}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color={color}>Deadline</FormLabel>
                        <Input
                            name="deadline"
                            defaultValue={formData.deadline}
                            type="date"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button colorScheme="teal" type="submit">
                        Update Job
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};