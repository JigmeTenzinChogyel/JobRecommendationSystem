import { useEffect, useState } from "react";
import api from "../../api";
import { APPLICATIONS } from "../../constants/url";
import { ApplicationResponse } from "./type";

export const useApplications = (id: number) => {

    const [applications, setApplications] = useState<ApplicationResponse[]>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(APPLICATIONS, {
                params: {
                    job_id: id
                }
            });
            if (res.status === 200) {
                setApplications(res.data)
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        applications,
        isLoading
    }
}