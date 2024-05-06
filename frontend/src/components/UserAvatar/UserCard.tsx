import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import useUser from "../../hooks/user/useUser"
import Loading from "../../pages/Loading";
import { useNavigate } from "react-router-dom";

type Props = {
    id: number
}

export const UserCard = ({ id }: Props) => {

    const { user, isLoading } = useUser(id);
    const navigate = useNavigate();

    if (isLoading) {
        return <Loading />
    }

    return (
        <Flex
            align="center"
            border="1px"
            borderColor="teal"
            borderRadius="sm"
            cursor="pointer"
            justify="space-between"
            p={2}
        >
            <Flex
                align="center"
                gap={4}
            >
                <Avatar
                    name={user?.name}
                    src={user?.avatar}
                    boxSize="60px"
                    bg="teal.400"
                    color="white"
                />
                <Box>
                    <Text fontSize="small">{user?.name}</Text>
                    <Text fontSize="x-small" as="i">{user?.email}</Text>
                </Box>
            </Flex>
            <Button 
                variant="outline" 
                colorScheme="teal" 
                fontSize="small"
                onClick={() => navigate(`/user/${id}`)}
            >
                Details
            </Button>
        </Flex>
    )
}
