import { useEffect, useState } from "react";
import { Job } from "../components/types/Types";
import api from "../api";

function useRandomJobs() {
    const [jobs, setJobs] = useState<Job[]>([{
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
    }]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {
        try {
            const response = await api.get("/api/jobs/random/");
            if (response.status === 200) {
                setJobs(response.data as Job[]);
            }
        } catch (error) {
            console.error(`Failed getting job: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        jobs,
        isLoading,
    };
}

export default useRandomJobs;
