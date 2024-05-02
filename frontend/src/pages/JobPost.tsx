import { useCompany } from "../hooks/company";
import Loading from "./Loading";
import JobForm from "../components/forms/JobForm";
import { NoCompany } from "../components/company/NoCompany";

function JobPost() {
    const { company, isLoading } = useCompany();

    if (isLoading) {
        return <Loading />
    }

    if (!company) {
        return (
            <>
                <NoCompany prompt="Please add company details to post job" />
            </>
        )
    }

    return (
        <>
            <JobForm />
        </>
    )
}

export default JobPost;