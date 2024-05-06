import { useEffect, useState } from "react";
import api from "../../api";
import { MeResponse } from "./type";
import { USER } from "../../constants/url";

function useUser(id: number) {

    const [user, setUser] = useState<MeResponse>();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const fetchuser = async () => {
            try {
                setIsLoading(true)
                const response = await api.get(USER(id));
                if (response.status === 200) {
                    setUser(response.data as MeResponse);
                }
            } catch (error) {
                console.error(`Failed getting user: ${error}`);
            } finally {
                setIsLoading(false)
            }
        }

        fetchuser();

    }, []);

    return { user, isLoading };
}

export default useUser;