import { useParams } from "react-router-dom";
import { useResumeByUser } from "../hooks/resume";
import Loading from "./Loading";
import { Divider, Flex } from "@chakra-ui/react";
import SingleAvatar from "../components/UserAvatar/SingleAvatar";
import ResumeDetails from "../components/resume/ResumeDetails";
import useUser from "../hooks/user/useUser";
import NotFound from "./NotFound";

type Props = {
    id: number
}
function UserResume() {

    const param = useParams()
    const id = parseInt(param.id || "")
    const { user, isLoading } = useUser(id)

    if (isLoading) {
        return <Loading />
    }

    if (!user) {
        return <NotFound />
    }

    return (
        <Flex w={{ base: "100%", md: "70%" }} direction="column" align="center" gap={4}>
            <SingleAvatar {...user} />
            <Component id={user?.id} />
        </Flex>
    )
}

export default UserResume;

const Component = ({ id }: Props) => {

    const { resume, isLoading } = useResumeByUser(id)
    console.log(resume)

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Divider display={{ base: "none", md: "block" }} />
            <ResumeDetails resume={resume} isLoading={isLoading} />
        </>
    )
}