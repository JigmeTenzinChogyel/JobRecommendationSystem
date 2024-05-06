import { useEffect, useState } from "react";
import api from "../../api";
import { JobResponse } from "./type";
import { JOB_BOOKMARK } from "../../constants/url";

export const useJobsByBookmark = () => {

    const [jobs, setjobs] = useState<JobResponse[]>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(JOB_BOOKMARK);
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