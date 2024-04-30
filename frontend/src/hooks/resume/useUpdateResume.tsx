import { useState } from "react"
import api from "../../api";
import { RESUME_UPDATE } from "../../constants/url";
import { updateResumeType } from "./type";

export const useUpdateResume = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateResume = async (input: updateResumeType) => {
        try {
            setIsLoading(true)
            const res = await api.patch(RESUME_UPDATE, input, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return res;
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        updateResume,
        isLoading,
    }
}
