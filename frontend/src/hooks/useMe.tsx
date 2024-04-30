import { useEffect, useState } from "react";
import api from "../api";
import { Me } from "../components/types/Types";

function useMe() {

    const [me, setMe] = useState<Me>({
        id: 0,
        name: "",
        email: "",
        user_type: "seeker",
        created_at: "",
        updated_at: "",
    });
    const [ isLoading, setIsLoading ] = useState(true)
    

    useEffect(() => {

        const fetchMe = async () => {
            try {
                const response = await api.get("/api/user/");
                if (response.status === 200) {
                    setMe(response.data as Me);
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