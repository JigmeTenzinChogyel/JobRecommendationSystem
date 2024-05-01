import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NoJob() {
    const navigate = useNavigate()
    return (
        <Flex justify="center" align="center" direction="column" gap={5} flexGrow="1">
            <Heading>No Jobs Posted</Heading>
            <Button 
                variant="outline"
                onClick={() => navigate("post")}
            >
                Post Job
            </Button>
        </Flex>
    )
}

export default NoJob;