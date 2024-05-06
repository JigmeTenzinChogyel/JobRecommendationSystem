import { useState } from "react";
import api from "../../api";
import { useToast } from "@chakra-ui/react";
import { APPLICATION_DELETE } from "../../constants/url";

export const useApplicationDelete = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    const deleteApplication = async (id: number) => {
        try {
            setIsLoading(true)
            const res = await api.delete(APPLICATION_DELETE(id))
            toast({
                title: "success!",
                status: "success"
            })
            return res;
        } catch (err) {
            toast({
                title: "failed!",
                status: "error"
            })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    };

    return {
        deleteApplication,
        isLoading,
    }
}