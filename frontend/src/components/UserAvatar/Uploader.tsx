import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import useUser from "../../hooks/user/useUser";
import Loading from "../../pages/Loading";
import NotFound from "../../pages/NotFound";

type Props = {
    id: number
}
function Uploader({ id }: Props) {

    const { user, isLoading } = useUser(id);

    if (isLoading) {
        return <Loading />
    }

    if (!user) {
        return <NotFound />
    }

    return (
        <Flex w="100%" direction="column" mb={4} px="3%" py="1%">
            <Text fontWeight="bold" textColor="gray.600">Posted By</Text>
            <Flex gap={5} direction="column" align="center">
                <Avatar
                    size="xl"
                    src={user.avatar}
                    name={user.name}
                />
                <Flex w="100%" direction="column" gap={1} py="2px" textAlign="center">
                    <Text fontSize="small" color="teal">{user.name}</Text>
                    <Text fontSize="x-small" textColor="gray.500" as="i">{user.email}</Text>
                    {/* <Text fontSize="small">{user.bio}</Text> */}
                </Flex>
            </Flex>
            <Divider my={2} />
        </Flex>
    )
}

export default Uploader;