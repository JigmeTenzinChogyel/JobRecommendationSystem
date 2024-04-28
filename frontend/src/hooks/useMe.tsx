import { useEffect, useState } from "react";
import api from "../api";

function useMe() {

    const [me, setMe] = useState();

    useEffect(() => {

        const fetchMe = async () => {
            try {
                const response = await api.get("/api/user/");
                if (response.status === 200) {
                    setMe(response.data);
                }
            } catch (error) {
                console.error(`Failed getting me: ${error}`);
            }

        }

        fetchMe();
        
    }, []);

    return me;
}

export default useMe;