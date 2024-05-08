import { useEffect, useState } from "react"
import api from "../../api";
import { STATS } from "../../constants/url";
import { StatsResponse } from "./type";

export const useStats = () => {
    const [stats, setStats] = useState<StatsResponse>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(STATS);
            if (res.status === 200) {
                setStats(res.data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        stats,
        isLoading,
    }
}