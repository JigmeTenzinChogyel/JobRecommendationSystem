import { useState } from "react";
import api from "../../api";
import { LOGIN_URL } from "../../constants/url";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";
import { LogInType } from "../../components/types/Types";

export const useLogin = () => {

    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const login = async (input: LogInType) => {
        try {
            setIsLoading(true)
            const res = await api.post(LOGIN_URL, input);
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                toast({
                    title: 'Welcome back!',
                    description: 'You have successfully logged in.',
                    status: 'success',
                });
                navigate("/");
            }
            return res;
        } catch (err) {
            toast({
                title: 'Login failed!',
                description: 'Invalid username or password. Please try again.',
                status: 'error',
            });
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    };

    return { login, isLoading }
}
