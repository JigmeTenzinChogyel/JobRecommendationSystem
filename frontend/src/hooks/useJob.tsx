import { useEffect, useState } from "react";
import { Job } from "../components/types/Types";
import api from "../api";
import { Navigate } from "react-router-dom";

type Props = {
    id?: number
}
function useJob({ id }: Props) {
    const [job, setJob] = useState<Job>({
        id: 0,
        user: 0,
        title: "",
        description: "",
        location: "",
        salary: 0,
        experience: [],
        skills: [],
        qualification: [],
        deadline: "",
        job_file: "",
        created_at: "",
        updated_at: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {
        if(!id) {
            return <Navigate to="/notfound" />
        }
        try {
            const response = await api.get(`/api/jobs/${id}/`);
            if (response.status === 200) {
                setJob(response.data as Job);
            }
        } catch (error) {
            console.error(`Failed getting job: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        job,
        isLoading,
    };
}

export default useJob;
