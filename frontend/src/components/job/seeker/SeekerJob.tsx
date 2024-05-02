import { Flex } from "@chakra-ui/react";
import { useResume } from "../../../hooks/resume";
import Loading from "../../../pages/Loading";
import RandomJobs from "../Randomjobs";
import RecommendedJobs from "../RecommendedJobs";
import NoResume from "../../resume/NoResume";

function SeekerJob() {

    const { resume, isLoading } = useResume();
    console.log(resume)

    if (isLoading) {
        return <Loading />
    }

    if (!resume) {
        return (
            <Flex direction="column">
                <NoResume />
                <RandomJobs />
            </Flex>
        )
    }

    return (
        <RecommendedJobs />
    )
}

export default SeekerJob;