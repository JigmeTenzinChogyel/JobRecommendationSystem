import useUserJobList from "../../hooks/useUserJobList";
import Loading from "../../pages/Loading";
import JobToggleDisplay from "./JobToggleDisplay";

function RecruiterJobList() {
    const { jobs, isLoading } = useUserJobList()

    if (isLoading) {
        return <Loading />
    }
    return (
        <JobToggleDisplay jobs={jobs} title="Posted Jobs" />
    )
}

export default RecruiterJobList;