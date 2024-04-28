import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormErrorMessage, FormLabel, useToast } from '@chakra-ui/react'
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

import { Box, Flex, Text, Input, Button, Link, Image, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {

    const navigate = useNavigate();
    const toast = useToast();
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
        // Handle form submission logic here
        try {
            const response = await api.post("/api/token/", data);
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                toast({
                    title: 'Welcome back!',
                    description: 'You have successfully logged in.',
                    status: 'success',
                });
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            toast({
                title: 'Login failed!',
                description: 'Invalid username or password. Please try again.',
                status: 'error',
            });
        }
    };

    return (
        <Flex h="100vh" bg="gray.800" alignItems="center" justifyContent="center">
            <Flex maxW="65%" bg="blue.900" rounded="xs" overflow="hidden">

                {/* Left Section */}
                <Box flex="1">
                    <Image src="https://www.nppc.gov.bt/wp-content/uploads/2023/02/5th-king.jpg" alt="Bill Gates" objectFit="cover" h="400px" />
                    <Flex p={5} flexDirection="column">
                        <Text color="white" fontSize="lg" fontWeight="bold" mt={6}>
                            Patience is a key element of success.
                        </Text>
                        <Text color="gray.400" fontSize="sm" mt={2}>
                            We must always stand united in spirit and purpose, we must always be one nation with one common goal.
                        </Text>
                    </Flex>
                </Box>

                {/* Right Section */}
                <Box bg="gray.900" flex="1.5" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Text fontSize="xl" fontWeight="bold" color="white" mb={5}>
                        Login to your account
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
                        Don't have an account? <Link href="#" color="white" fontWeight="bold">Signup</Link>
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                        By creating account you agree to our Terms of Service
                    </Text>
                </Box>
            </Flex>
            <Link color="gray.200" position="absolute" top={4} left={4}>
                Back to home
            </Link>
        </Flex>

    );
};

export default LoginForm;