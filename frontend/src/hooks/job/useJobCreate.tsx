import { useState } from "react";
import { JobCreate } from "./type";
import api from "../../api";
import { useToast } from "@chakra-ui/react";
import { JOB_CREATE } from "../../constants/url";
import { useNavigate } from "react-router-dom";

export const useJobCreate = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();

    const createJob = async (input: JobCreate) => {
        try {
            setIsLoading(true)
            const res = await api.post(JOB_CREATE, input, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast({
                title: "Job posted successfully!",
                status: "success"
            })
            navigate(`confirm?id=${res.data.id}`)
            return res;
        } catch (err) {
            toast({
                title: "Job post failed!",
                status: "error"
            })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    };

    return {
        createJob,
        isLoading,
    }
}