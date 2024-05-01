import { useJobs } from "../../hooks/job";
import Loading from "../../pages/Loading";
import JobToggleDisplay from "./JobToggleDisplay";

function RandomJobs() {
    
    const {jobs, isLoading} = useJobs(true)
    if (isLoading) {
        return <Loading />
    }
    return (
        <JobToggleDisplay jobs={jobs} title="Jobs" />
    )
}

export default RandomJobs;