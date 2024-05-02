import { useEffect, useState } from "react"
import { JobResponse } from "./type";
import api from "../../api";
import { JOB_RANDOM, JOB_RECOMMENDATION } from "../../constants/url";

export const useJobs = (random: boolean) => {
    const [jobs, setJobs] = useState<JobResponse[]>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(random ? JOB_RANDOM : JOB_RECOMMENDATION);
            if (res.status === 200) {
                setJobs(res.data)
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        jobs,
        isLoading
    }
}