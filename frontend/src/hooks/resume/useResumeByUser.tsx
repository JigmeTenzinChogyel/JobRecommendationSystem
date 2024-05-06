import { useEffect, useState } from "react"
import { resumeResponseType } from "./type";
import api from "../../api";
import { RESUME_USER } from "../../constants/url";

export const useResumeByUser = (id: number) => {
    
    const [resume, setResume] = useState<resumeResponseType>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(RESUME_USER, {
                params: {
                    user_id: id
                }
            });
            if (res.status === 200) {
                setResume(res.data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        resume,
        isLoading,
    }
}