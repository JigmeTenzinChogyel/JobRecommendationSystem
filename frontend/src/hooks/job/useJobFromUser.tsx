import { useEffect, useState } from "react"
import { JobResponse } from "./type"
import api from "../../api";
import { JOB_USER } from "../../constants/url";

export const useJobFromUser = () => {

    const [jobs, setJobs] = useState<JobResponse[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(JOB_USER);
            if (res.status === 200) {
                setJobs(res.data)
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    }

    return {
        jobs,
        isLoading
    }
}