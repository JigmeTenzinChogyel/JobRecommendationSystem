import { Divider, Flex } from "@chakra-ui/react";
import SingleAvatar from "../components/UserAvatar/SingleAvatar";
import Company from "../components/company/CompanyDetails";
import { useCompany } from "../hooks/company";
import { useAuth } from "../providers/AuthProvider";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";
import { useResume } from "../hooks/resume";
import ResumeDetails from "../components/resume/ResumeDetails";

function Profile() {

    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <Loading />
    }
    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <Flex w={{ base: "100%", md: "70%" }} direction="column" align="center" gap={4}>
            <SingleAvatar {...user} />
            {
                user.user_role === "seeker" ? <Seeker /> : <Recruiter />
            }
        </Flex>
    )
}

export default Profile;

const Recruiter = () => {

    const { company, isLoading } = useCompany();

    return (
        <>
            <Divider display={{ base: "none", md: "block" }} />
            <Company company={company} isLoading={isLoading} />
        </>
    )
}

const Seeker = () => {

    const { resume, isLoading } = useResume();
    return (
        <>
            <Divider display={{ base: "none", md: "block" }} />
            <ResumeDetails resume={resume} isLoading={isLoading} />
        </>
    )
}