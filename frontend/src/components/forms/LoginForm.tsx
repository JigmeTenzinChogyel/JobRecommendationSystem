import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

interface FormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {

    const navigate = useNavigate();
    const toast = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: 'Invalid email format',
                            },
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;