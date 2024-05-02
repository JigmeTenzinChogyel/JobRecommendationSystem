import Loading from "./Loading";
import SEQConfirmation from "../components/confirmation/SEQConfirmation";
import { useResume } from "../hooks/resume";

function ConfirmResume() {

    const { resume, isLoading } = useResume()

    if (isLoading) {
        return <Loading />
    }

    if (!resume) {
        return <>No Resume</>
    }

    return (
        <SEQConfirmation id={resume.id} isResume={true} skills={resume?.skills} experience={resume.experience} qualification={resume.qualification} />
    )
}

export default ConfirmResume;
