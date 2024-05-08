import { useEffect, useState } from "react";
import { CompanyResponse } from "./type";
import api from "../../api";
import { COMAPNIES } from "../../constants/url";

export const useCompanies = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [companies, setCompanies] = useState<CompanyResponse[]>();

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(COMAPNIES);
            if (res.status === 200) {
                setCompanies(res.data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        companies,
        isLoading,
    }
}