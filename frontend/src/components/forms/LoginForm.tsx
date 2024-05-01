import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormLabel, Icon } from '@chakra-ui/react'
import { Box, Flex, Text, Input, Button, Link, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Loading from '../../pages/Loading';
import { useLogin } from '../../hooks/auth';
import "./form.css"

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
        <Flex h="100vh" bg="white" alignItems="center" justifyContent="center">
            <Link href="/" color="gray.600" position="absolute" top={4} left={4} display="flex" alignItems="center">
                <Icon as={ArrowBackIcon} boxSize={6} mr={2} />
                Back to home
            </Link>
            {/* Right Section */}
            <Box w={{ base: "100%", md: "30%" }} h={{ base: "100%", md: "auto" }} bg="white" px="5%" py="2%" display="flex" justifyContent="center" alignItems="center" flexDirection="column" borderRadius="lg" shadow="lg">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={5}>
                    Welcome
                </Text>

                {/* Email */}
                <form onSubmit={handleSubmit(onSubmit)} >
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
                        {errors.email && <FormErrorMessage color="red.500">{errors.email.message}.</FormErrorMessage>}
                    </FormControl>

                    {/* Password */}
                    <FormControl isRequired isInvalid={errors.password ? true : false} mb={5}>
                        <FormLabel color='gray.700'>Password</FormLabel>
                        <InputGroup>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register('password', { required: 'Password is required' })}
                                placeholder="Password"
                                bg="gray.100"
                                color="gray.700"
                                borderColor="gray.300"
                                _hover={{ borderColor: 'gray.400' }}
                            />
                            <InputRightElement>
                                <IconButton
                                    variant="ghost"
                                    colorScheme="gray"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    icon={showPassword ? <FaEye /> : <FaEyeSlash /> }
                                    onClick={handleTogglePasswordVisibility}
                                />
                            </InputRightElement>
                        </InputGroup>
                        {errors.password && <FormErrorMessage color="red.500">{errors.password.message}</FormErrorMessage>}
                    </FormControl>

                    <Button type='submit' colorScheme="blue" mb={4} w="100%" boxShadow="md" _hover={{ boxShadow: 'lg' }}>
                        Login
                    </Button>
                </form>

                <Text color="gray.600" mb={4} mt={4} fontSize="xs">
                    Don't have an account? <Link href="/register" color="blue.600" fontWeight="bold">Register</Link>
                </Text>
                <Text color="gray.600" fontSize="xs">
                    By creating an account, you agree to our <Link href="#" color="blue.600" fontWeight="bold">Terms of Service</Link>
                </Text>
            </Box>
        </Flex>

    );
};

export default LoginForm;