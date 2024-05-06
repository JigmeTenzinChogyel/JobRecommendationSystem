import { useEffect, useState } from "react"
import { resumeResponseType } from "./type";
import api from "../../api";
import { RESUME_RECOMMENDATION } from "../../constants/url";

export const useResumeRecommendation = (id: number) => {

    const [resumes, setResumes] = useState<resumeResponseType[]>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(RESUME_RECOMMENDATION, {
                params: {
                    job_id: id
                }
            });
            if (res.status === 200) {
                setResumes(res.data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        resumes,
        isLoading,
    }
}