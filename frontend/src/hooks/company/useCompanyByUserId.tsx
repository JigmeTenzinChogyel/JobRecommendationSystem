import { useEffect, useState } from "react";
import api from "../../api";
import { COMPANY_USER } from "../../constants/url";
import { CompanyResponse } from "./type";

export const useCompanyByUserId = (id: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [company, setCompany] = useState<CompanyResponse>();

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        try {
            setIsLoading(true);
            const res = await api.get(COMPANY_USER, {
                params: {
                    user_id: id
                }
            });

            if (res.status === 200) {
                setCompany(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        company,
        isLoading,
    };
};