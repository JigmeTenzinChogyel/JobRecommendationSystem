import { useState } from "react";
import api from "../../api";
import { useToast } from "@chakra-ui/react";
import { APPLICATION_CREATE } from "../../constants/url";
import { ApplicationCreate } from "./type";

export const useApplicationCreate = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    const createApplication = async (input: ApplicationCreate) => {
        try {
            setIsLoading(true)
            const res = await api.post(APPLICATION_CREATE, input)
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
        createApplication,
        isLoading,
    }
}