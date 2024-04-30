import { useState } from "react"
import api from "../../api";
import { RESUME_DELETE } from "../../constants/url";

export const useDeleteResume = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteResume = async () => {
        try {
            setIsLoading(true);
            const res = await api.delete(RESUME_DELETE)
            return res;
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }

    }

    return {
        deleteResume,
        isLoading,
    }
}