import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

type Props = {
    name?: string
    role?: string
    src?: string
}

function UserAvatar( { name, role, src }: Props ) {
    return (
        <Flex align='center' gap={4}>
            <Avatar size='sm' name={name} src={src} />
            <Box textAlign='left'>
                <Text fontSize='sm' fontWeight='bold'>{name || "user name"}</Text>
                <Text fontSize='xs'>{role || "user role"}</Text>
            </Box>
        </Flex>
    )
}

export default UserAvatar;