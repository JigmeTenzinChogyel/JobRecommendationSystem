import { Flex, Text } from "@chakra-ui/react";
import { UserCard } from "./UserCard";
import { ApplicationResponse } from "../../hooks/applications";

type Props = {
    applications: ApplicationResponse[]
}
function Applicants({ applications }: Props) {
    console.log(applications)
    return (
        <Flex direction="column" gap={2} my={2}>
            <Text fontWeight="bold" textColor="teal">Applicants</Text>
            {
                applications?.map((app, index) => (
                    <UserCard id={app.user} key={index} />
                ))
            }
        </Flex>
    )
}

export default Applicants;