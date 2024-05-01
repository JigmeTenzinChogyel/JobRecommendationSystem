import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobUpdate } from "./type";
import { JOB_UPDATE } from "../../constants/url";
import api from "../../api";

export const useJobUpdate = (id: number) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();

    const updateJob = async (input: JobUpdate) => {
        try {
            setIsLoading(true)
            const res = await api.patch(JOB_UPDATE(id), input, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast({
                title: "Job updated successfully!",
                status: "success"
            })
            navigate("/job")
            return res;
        } catch (err) {
            toast({
                title: "Job updated failed!",
                status: "error"
            })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    };

    return {
        updateJob,
        isLoading,
    }
}