import useRandomJobs from "../../hooks/useRandomJobs";
import Loading from "../../pages/Loading";
import JobToggleDisplay from "./JobToggleDisplay";

function RandomJobs() {
    
    const { jobs, isLoading } = useRandomJobs()

    if (isLoading) {
        return <Loading />
    }
    return (
        <JobToggleDisplay jobs={jobs} title="Jobs" />
    )
}

export default RandomJobs;