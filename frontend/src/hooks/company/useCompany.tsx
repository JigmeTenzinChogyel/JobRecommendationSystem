import { useEffect, useState } from "react";
import { CompanyResponse } from "./type";
import api from "../../api";
import { COMPANY_DETAIL } from "../../constants/url";

export const useCompany = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [company, setCompany] = useState<CompanyResponse>();

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(COMPANY_DETAIL);
            if (res.status === 200) {
                setCompany(res.data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        company,
        isLoading,
    }
}