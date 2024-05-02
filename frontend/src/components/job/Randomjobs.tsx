import { useJobs } from "../../hooks/job";
import Loading from "../../pages/Loading";

function RandomJobs() {
    
    const {jobs, isLoading} = useJobs(true)
    if (isLoading) {
        return <Loading />
    }
    return (
        <>random</>
    )
}

export default RandomJobs;