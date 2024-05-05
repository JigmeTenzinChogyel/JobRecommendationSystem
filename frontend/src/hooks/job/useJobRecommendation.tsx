import { useState } from "react";
import api from "../../api";
import { JOB_RECOMMENDATION } from "../../constants/url";
import { JobResponse } from "./type";

export const useJobRecommendation = (page?: number) => {

    const [jobs, setjobs] = useState<JobResponse[]>()
    const [isLoading, setIsLoading] = useState(false);

    const fetchRecommendation = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(JOB_RECOMMENDATION, {
                params: {
                    page
                }
            });
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        fetchRecommendation,
        jobs,
        isLoading,
        setjobs
    }
}