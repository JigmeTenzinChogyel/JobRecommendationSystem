import { useState } from "react"
import api from "../../api";
import { RESUME_UPDATE } from "../../constants/url";
import { updateResumeType } from "./type";
import { useToast } from "@chakra-ui/react";

export const useUpdateResume = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const updateResume = async (input: updateResumeType) => {
        try {
            setIsLoading(true)
            if (input.resume_file) {
                const res = await api.patch(RESUME_UPDATE, input, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                toast({
                    title: "Success!",
                    status: "success"
                })
                return res;
            } else {
                const res = await api.patch(RESUME_UPDATE, input);
                toast({
                    title: "Success!",
                    status: "success"
                })
                return res;
            }
        } catch (err) {
            toast({
                title: "Failed!",
                status: "error"
            })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        updateResume,
        isLoading,
    }
}
