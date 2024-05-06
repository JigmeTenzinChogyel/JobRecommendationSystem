import { useEffect, useState } from "react"
import api from "../../api";
import { BOOKMARK_JOB } from "../../constants/url";
import { BookmarkResponse } from "./type";

export const useBookmarkByJob = (id: number) => {

    const [bookmark, setBookmark] = useState<BookmarkResponse>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(BOOKMARK_JOB, {
                params: {
                    job_id: id
                }
            });
            if (res.status === 200) {
                setBookmark(res.data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        bookmark,
        isLoading,
        setBookmark
    }
}