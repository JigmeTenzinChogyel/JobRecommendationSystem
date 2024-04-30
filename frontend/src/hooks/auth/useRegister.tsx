import { useState } from "react"
import { RegisterType } from "../../components/types/Types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import api from "../../api";
import { REGISTER_URL } from "../../constants/url";

export const useRegister = () => {

    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const register = async (input: RegisterType) => {
        try {
            setIsLoading(true);
            const res = await api.post(REGISTER_URL, input, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast({
                title: 'Registration Successful!',
                description: 'You have successfully registered. Please check your email for verification.',
                status: 'success',
            });
            navigate("/login");
            return res;
        } catch (err) {
            toast({
                title: 'Registration Failed',
                description: 'An error occurred during registration. Please try again later.',
                status: 'error',
            });
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        register,
        isLoading
    }
}