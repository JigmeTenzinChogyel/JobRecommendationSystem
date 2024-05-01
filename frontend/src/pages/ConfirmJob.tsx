import { useSearchParams } from "react-router-dom";
import { useJob } from "../hooks/job";
import NotFound from "./NotFound";
import Loading from "./Loading";
import SEQConfirmation from "../components/confirmation/SEQConfirmation";

type Props = {
    id: number
}

function ConfirmJob() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    if (!id || id == null) {
        return <NotFound />
    }
    return (
        <Component id={parseInt(id)} />
    )
}

export default ConfirmJob;

const Component = ({id}: Props) => {

    const { job, isLoading } = useJob(id);

    if (isLoading) {
        return <Loading />
    }

    if(!job) {
        return <>No Job</>
    }

    return (
        <SEQConfirmation id={job.id} skills={job?.skills} experience={job.experience} qualification={job.qualification}/>
    )
}
