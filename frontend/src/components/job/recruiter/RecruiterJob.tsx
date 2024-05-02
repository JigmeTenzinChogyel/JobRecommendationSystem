import { useJobFromUser } from "../../../hooks/job";
import Loading from "../../../pages/Loading";
import Display from "./Display";
import NoJob from "./NoJob";

function RecruiterJob() {

    const { jobs, isLoading } = useJobFromUser();

    if(isLoading) {
        return <Loading />
    }

    if(!jobs || jobs.length === 0) {
        return (
            <NoJob />
        )
    }

    return (
        <Display jobs={jobs} />
    )
}

export default RecruiterJob;