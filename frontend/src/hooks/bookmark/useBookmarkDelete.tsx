import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { BOOKMARK_DELETE } from "../../constants/url";
import api from "../../api";


export const useBookmarkDelete = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    const deleteBookmark = async (id: number) => {
        try {
            setIsLoading(true)
            const res = await api.delete(BOOKMARK_DELETE(id))
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
        deleteBookmark,
        isLoading,
    }
}