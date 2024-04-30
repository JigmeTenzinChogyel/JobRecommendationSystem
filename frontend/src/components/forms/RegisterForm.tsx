import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/auth';
import Loading from '../../pages/Loading';

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
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
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 5,
                                message: 'Password must be at least 5 characters long',
                            },
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === password || 'Passwords do not match',
                        })}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
                <div>
                    <label htmlFor="user_role">User Role:</label>
                    <select
                        id="user_role"
                        {...register('user_role', { required: 'User type is required' })}
                    >
                        <option value="">Select user type</option>
                        <option value="seeker">Seeker</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                    {errors.user_role && <p>{errors.user_role.message}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;