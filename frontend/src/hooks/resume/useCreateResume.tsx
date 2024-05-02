import { useState } from "react"
import { createResumeType } from "./type";
import api from "../../api";
import { RESUME_CREATE } from "../../constants/url";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const UseCreateResume = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const createResume = async (input: createResumeType) => {
        console.log("input", input)
        try {
            setIsLoading(true)
            const res = await api.post(RESUME_CREATE, input, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast({
                title: "Resume uploaded!",
                status: "success"
            })
            navigate("/resume/confirm")
            return res;
        } catch (err) {
            toast({
                title: "Resume upload Failed!",
                status: "error"
            })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    };
    return {
        createResume,
        isLoading,
    }
}