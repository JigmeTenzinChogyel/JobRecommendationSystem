import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { CompanyCreateType } from "./type";
import api from "../../api";
import { COMPANY_CREATE } from "../../constants/url";

export const useCompanyCreate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const createCompany = async (input: CompanyCreateType) => {
        try {
            setIsLoading(true)
            const res = await api.post(COMPANY_CREATE, input, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast({
                title: "Success",
                status: "success"
            })
            return res;
        } catch (err) {
            toast({
                title: "Failed",
                status: "error"
            })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    };
    return {
        createCompany,
        isLoading,
    }
}