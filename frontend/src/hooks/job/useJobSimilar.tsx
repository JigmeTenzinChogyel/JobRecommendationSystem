import { useEffect, useState } from "react";
import api from "../../api";
import { JOB_SIMILAR } from "../../constants/url";
import { JobResponse } from "./type";

export const useJobSimilar = (id: number) => {

    const [jobs, setjobs] = useState<JobResponse[]>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(JOB_SIMILAR, {
                params: {
                    job_id: id
                }
            });
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