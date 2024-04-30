import { useEffect, useState } from "react";
import api from "../api";
import { Resume } from "../components/types/Types";

function useMeResume() {

    const [resume, setResume] = useState<Resume>({
        id: 0,
        user: 0,
        experience: [],
        skills: [],
        qualification: [],
        resume_file: "",
        created_at: "",
        updated_at: "",
    });
    const [ isLoading, setIsLoading ] = useState(true)
    

    useEffect(() => {

        const fetchResume = async () => {
            try {
                const response = await api.get("/api/resumes/me/");
                if (response.status === 200) {
                    setResume(response.data as Resume);
                }
            } catch (error) {
                console.error(`Failed getting resume: ${error}`);
            } finally {
                setIsLoading(false)
            }

        }

        fetchResume();
        
    }, []);

    return { resume, isLoading };
}

export default useMeResume;