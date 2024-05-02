import { useParams } from "react-router-dom";
import { useResumeById } from "../hooks/resume";
import Loading from "./Loading";

function Resume() {

    const param = useParams()
    const id = parseInt(param.id || "")
    const { resume, isLoading } = useResumeById(id)
    console.log(resume)

    if (isLoading) {
        return <Loading />
    }

    return (
        <></>
    )
}

export default Resume;