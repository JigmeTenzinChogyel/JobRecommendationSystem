import { useEffect, useState } from "react";
import api from "../../api";
import { JOB_RECOMMENDATION } from "../../constants/url";
import { JobResponse } from "./type";

export const useJobRecommendation = () => {

    const [jobs, setjobs] = useState<JobResponse[]>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(JOB_RECOMMENDATION);
            if (res.status === 200) {
                setjobs(res.data)
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