import { useParams } from "react-router-dom";
import { useJob } from "../hooks/job";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { JobUpdateForm } from "../components/forms/JobUpdateForm";

function JobUpdate() {
    const param = useParams()
    const id = parseInt(param.id || "")
    const { job, isLoading } = useJob(id);

    if (isLoading) {
        return <Loading />
    }
    if (!job) {
        return <NotFound />
    }
    return (
        <JobUpdateForm job={job} />
    )
}

export default JobUpdate;