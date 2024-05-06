import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { BookmarkCreate } from "./type";
import { BOOKMARK_CREATE } from "../../constants/url";
import api from "../../api";


export const useBookmarkCreate = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    const createBookmark = async (input: BookmarkCreate) => {
        try {
            setIsLoading(true)
            const res = await api.post(BOOKMARK_CREATE, input)
            toast({
                title: "Bookmarked!",
                status: "success"
            })
            return res;
        } catch (err) {
            toast({
                title: "Failed!",
                status: "error"
            })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    };

    return {
        createBookmark,
        isLoading,
    }
}