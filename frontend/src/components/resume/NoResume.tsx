import { Flex, Heading } from "@chakra-ui/react";
import UploadResume from "./UploadResume";

function NoResume() {
    return (
        <Flex justify="center" align="center" direction="column" gap={5} flexGrow="1">
            <Heading>Resume Not Found</Heading>
            <UploadResume />
        </Flex>
    )
}

export default NoResume;