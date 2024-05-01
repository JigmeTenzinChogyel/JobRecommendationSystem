import { useEffect, useState } from "react";
import api from "../../api";
import { MeResponse } from "./type";
import { ME_URL } from "../../constants/url";

function useMe() {

    const [me, setMe] = useState<MeResponse>();
    const [ isLoading, setIsLoading ] = useState(false)
    
    useEffect(() => {

        const fetchMe = async () => {
            try {
                setIsLoading(true)
                const response = await api.get(ME_URL);
                if (response.status === 200) {
                    setMe(response.data as MeResponse);
                }
            } catch (error) {
                console.error(`Failed getting me: ${error}`);
            } finally {
                setIsLoading(false)
            }
        }

        fetchMe();
        
    }, []);

    return { me, isLoading };
}

export default useMe;