import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormLabel, Icon, Select } from '@chakra-ui/react'
import { Box, Flex, Text, Input, Button, Link } from '@chakra-ui/react';
import { ArrowBackIcon } from "@chakra-ui/icons";
import Loading from '../../pages/Loading';
import { useRegister } from '../../hooks/auth';
import "./form.css"

type user_role = 'seeker' | 'recruiter';

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    user_role: user_role;
}

const RegisterForm: React.FC = () => {
    const { register: submit, isLoading } = useRegister()
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        console.log(data);
        const { name, email, password, user_role } = data;
        await submit({ name, email, password, user_role });
    };

    const password = watch('password');

    if (isLoading) {
        return <Loading />
    }

    return (
        <Flex h="100vh" bg="white" alignItems="center" justifyContent="center">
            <Link href="/" color="gray.600" position="absolute" top={4} left={4} display="flex" alignItems="center">
                <Icon as={ArrowBackIcon} boxSize={6} mr={2} />
                Back to home
            </Link>

            <Box w={{ base: "100%", md: "30%" }} h={{ base: "100%", md: "auto" }} bg="white" px="5%" py="2%" display="flex" justifyContent="center" alignItems="center" flexDirection="column" borderRadius="lg" shadow="lg">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={5}>
                    Register
                </Text>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <FormControl isRequired isInvalid={errors.name ? true : false} mb={5}>
                        <FormLabel color='gray.700'>Name</FormLabel>
                        <Input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="Name"
                            bg="gray.100"
                            color="gray.700"
                            borderColor="gray.300"
                            _hover={{ borderColor: 'gray.400' }}
                        />
                        {errors.name && <FormErrorMessage color="red.500">{errors.name.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isRequired isInvalid={errors.email ? true : false} mb={5}>
                        <FormLabel color='gray.700'>Email</FormLabel>
                        <Input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: 'Invalid email format',
                                },
                            })}
                            placeholder="Email"
                            bg="gray.100"
                            color="gray.700"
                            borderColor="gray.300"
                            _hover={{ borderColor: 'gray.400' }}
                        />
                        {errors.email && <FormErrorMessage color="red.500">{errors.email.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isRequired isInvalid={errors.password ? true : false} mb={5}>
                        <FormLabel color='gray.700'>Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 5,
                                    message: 'Password must be at least 5 characters long',
                                },
                            })}
                            placeholder="Password"
                            bg="gray.100"
                            color="gray.700"
                            borderColor="gray.300"
                            _hover={{ borderColor: 'gray.400' }}
                        />
                        {errors.password && <FormErrorMessage color="red.500">{errors.password.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isRequired isInvalid={errors.confirmPassword ? true : false} mb={5}>
                        <FormLabel color='gray.700'>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) =>
                                    value === password || 'Passwords do not match',
                            })}
                            placeholder="Confirm Password"
                            bg="gray.100"
                            color="gray.700"
                            borderColor="gray.300"
                            _hover={{ borderColor: 'gray.400' }}
                        />
                        {errors.confirmPassword && <FormErrorMessage color="red.500">{errors.confirmPassword.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isRequired isInvalid={errors.user_role ? true : false} mb={5}>
                        <FormLabel color='gray.700'>User Role</FormLabel>
                        <Select
                            placeholder="What are you looking for?"
                            id="user_role"
                            {...register('user_role', { required: 'User Role is required' })}
                        >
                            <option value="seeker">Jobs</option>
                            <option value="recruiter">Talents</option>
                        </Select>
                        {errors.user_role && <FormErrorMessage color="red.500">{errors.user_role.message}</FormErrorMessage>}
                    </FormControl>
                    <Button type='submit' colorScheme="blue" mb={4} w="100%" boxShadow="md" _hover={{ boxShadow: 'lg' }}>
                        Register
                    </Button>
                </form>

                <Text color="gray.600" mb={4} mt={4} fontSize="xs">
                    Already have an account? <Link href="/login" color="blue.600" fontWeight="bold">Login</Link>
                </Text>
                <Text color="gray.600" fontSize="xs">
                    By creating an account, you agree to our <Link href="#" color="blue.600" fontWeight="bold">Terms of Service</Link>
                </Text>
            </Box>
        </Flex>
    );
};
export default RegisterForm;