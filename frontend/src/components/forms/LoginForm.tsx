import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormLabel, Icon } from '@chakra-ui/react'
import { Box, Flex, Text, Input, Button, Link, Image, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Loading from '../../pages/Loading';
import { useLogin } from '../../hooks/auth';

interface FormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {

    const { login, isLoading } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        console.log(data)
        await login(data);
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <Flex h="100vh" bg="gray.800" alignItems="center" justifyContent="center">
            <Flex maxW="65%" maxWidth="250vh" bg="blue.900" rounded="xs" overflow="hidden">

                {/* Left Section */}
                <Box flex="1">
                    <Image src="src\assets\job1.jpg" alt="Bhutan Job" objectFit="cover" h="60vh" />
                    <Flex py={3} flexDirection="column" textAlign='center'>
                        <Text color="white" fontSize="md" fontWeight="bold" mt={2}>
                            Patience is a key element of success.
                        </Text>
                        <Text color="gray.400" fontSize="xs" mt={1}>
                            We must always stand united in spirit and purpose, we must always be one nation with one common goal.
                        </Text>
                    </Flex>
                </Box>

                {/* Right Section */}
                <Box bg="gray.900" flex="1.5" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Text fontSize="xl" fontWeight="bold" color="white" mb={5}>
                        Welcome
                    </Text>

                    {/* Email */}
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <FormControl isRequired isInvalid={errors.email ? true : false} mb={5}>
                            <FormLabel color='white'>Email</FormLabel>
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
                                bg="gray.700"
                                color="white"
                            />
                            {errors.email && <FormErrorMessage>{errors.email.message}.</FormErrorMessage>}
                        </FormControl>

                        {/* Password */}
                        <FormControl isRequired isInvalid={errors.password ? true : false} mb={5}>
                            <FormLabel color='white' >Password</FormLabel>
                            <InputGroup>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register('password', { required: 'Password is required' })}
                                    placeholder="Password"
                                    bg="gray.700"
                                    color="white"
                                />
                                <InputRightElement>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="blue"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                        onClick={handleTogglePasswordVisibility}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                        </FormControl>

                        <Button type='submit' colorScheme="blue" mb={4} w="100%">
                            Login
                        </Button>
                    </form>

                    <Text color="gray.400" mb={4} mt={4} fontSize="xs">
                        Don't have an account? <Link href="/register" color="white" fontWeight="bold">Register</Link>
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                        By creating account you agree to our Terms of Service
                    </Text>
                </Box>
            </Flex>

            <Link href="/" color="gray.200" position="absolute" top={4} left={4} display="flex" alignItems="center">
                <Icon as={ArrowBackIcon} boxSize={6} mr={2} />
                Back to home{/* it is in link, either you make link or history */}
            </Link>
        </Flex>

    );
};

export default LoginForm;