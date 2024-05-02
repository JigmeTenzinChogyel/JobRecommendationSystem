import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import api from "../../api";
import { UserUpdate } from "./type";
import { ME_UPDATE } from "../../constants/url";

export const useMeUpdate = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    const updateMe = async (input: UserUpdate) => {
        try {
            setIsLoading(true)
            const res = await api.patch(ME_UPDATE, input, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast({
                title: "Success",
                status: "success"
            })
            return res;
        } catch (err) {
            toast({
                title: "Failed!",
                status: "error"
            })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    };

    return {
        updateMe,
        isLoading,
    }
}