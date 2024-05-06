import { useEffect, useState } from "react";
import api from "../../api";
import { APPLICATION_JOB } from "../../constants/url";
import { ApplicationResponse } from "./type";

export const useApplicationByJob = (id: number) => {

    const [application, setApplication] = useState<ApplicationResponse>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(APPLICATION_JOB, {
                params: {
                    job_id: id
                }
            });
            if (res.status === 200) {
                setApplication(res.data)
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        application,
        isLoading,
        setApplication
    }
}