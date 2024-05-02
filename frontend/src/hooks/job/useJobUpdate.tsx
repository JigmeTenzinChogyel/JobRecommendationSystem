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
        console.log(JOB_UPDATE(id))
        console.log(JSON.stringify(input))
        try {
            setIsLoading(true)
            if (!input.job_file) {
                const res = await api.patch(JOB_UPDATE(id), input)
                toast({
                    title: "Success!",
                    status: "success"
                })
                navigate(`/job/${res.data.id}`)
                return res;
            } else {
                const res = await api.patch(JOB_UPDATE(id), input, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                toast({
                    title: "Success!",
                    status: "success"
                })
                navigate(`/job/${res.data.id}`)
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
    };

    return {
        updateJob,
        isLoading,
    }
}