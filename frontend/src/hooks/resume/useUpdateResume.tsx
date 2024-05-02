import { useState } from "react"
import api from "../../api";
import { RESUME_UPDATE } from "../../constants/url";
import { updateResumeType } from "./type";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const useUpdateResume = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
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
                navigate(`/resume/${res.data.id}`)
                return res;
            } else {
                const res = await api.patch(RESUME_UPDATE, input);
                toast({
                    title: "Success!",
                    status: "error"
                })
                navigate(`/resume/${res.data.id}`)
                return res;
            }
        } catch (err) {
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
