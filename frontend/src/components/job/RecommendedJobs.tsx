import useRecommendedJobs from "../../hooks/useRecommendedJobs";
import Loading from "../../pages/Loading";
import JobToggleDisplay from "./JobToggleDisplay";

function RecommendedJobs() {
    const { jobs, isLoading } = useRecommendedJobs()
    if (isLoading) {
        return <Loading />
    }
    return (
        <JobToggleDisplay jobs={jobs} title="Recommended Jobs" />
    )
}

export default RecommendedJobs;