import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

type Props = {
    name?: string
    role?: string
}

function UserAvatar( { name, role }: Props ) {
    return (
        <Flex align='center' gap={4}>
            <Avatar size='sm' />
            <Box textAlign='left'>
                <Text fontSize='sm' fontWeight='bold'>{name || "user name"}</Text>
                <Text fontSize='xs'>{role || "user role"}</Text>
            </Box>
        </Flex>
    )
}

export default UserAvatar;