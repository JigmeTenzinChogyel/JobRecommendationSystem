import { Flex, Text } from "@chakra-ui/react"
import { useResumeRecommendation } from "../../hooks/resume"
import Loading from "../../pages/Loading"
import { UserCard } from "../UserAvatar/UserCard"

type Props = {
    id: number
}
export const ResumeRecommendation = ({id}: Props) => {

    const { resumes, isLoading } = useResumeRecommendation(id);

    if(isLoading) {
        return <Loading />
    }


    return (
        <Flex direction="column" gap={2}>
            <Text fontWeight="bold" textColor="teal">Potentail Candidates</Text>
            {
                resumes?.map((resume, index) => (
                    <UserCard id={resume.user} key={index}/>
                ))
            }
        </Flex>
    )
}