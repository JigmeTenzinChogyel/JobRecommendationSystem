import { useEffect, useState } from "react";
import api from "../../api";
import { JOB_DETAIL } from "../../constants/url";
import { JobResponse } from "./type";

export const useJob = (id: number) => {

    const [job, setjob] = useState<JobResponse>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [id])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(JOB_DETAIL(id));
            if (res.status === 200) {
                setjob(res.data)
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        job,
        isLoading
    }
}