import { useEffect, useState } from "react"
import { resumeResponseType } from "./type";
import api from "../../api";
import { RESUME_ME } from "../../constants/url";

export const useResume = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [resume, setResume] = useState<resumeResponseType>();

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(RESUME_ME);
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