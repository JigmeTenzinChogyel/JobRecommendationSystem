import { useEffect, useState } from "react"
import { resumeResponseType } from "./type";
import api from "../../api";
import { RESUME_ID } from "../../constants/url";

export const useResumeById = (id: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [resume, setResume] = useState<resumeResponseType>();

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(RESUME_ID(id));
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