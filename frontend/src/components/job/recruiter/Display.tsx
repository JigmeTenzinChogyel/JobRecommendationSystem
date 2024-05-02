import { Flex, Grid, GridItem, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import { JobResponse } from "../../../hooks/job";
import JobCard from "../JobCard";
import { useNavigate } from "react-router-dom";
import { icons } from "../../../utils/icons";

type Props = {
    jobs: JobResponse[]
}
function Display({ jobs }: Props) {

    const [isCard, setIsCard] = useState<boolean>(true);
    const navigate = useNavigate();

    return (
        <Flex px='5%' py={5} gap={10} direction="column" position='relative' w={{ base: "100%", md: "75%" }}>
            <Flex align="center" justify="space-between">
                <Text fontSize='xl' fontWeight='bold'>Job Posted</Text>
                {/* Toggle display type */}
                <Flex align="center" justify="center" gap={3}>
                    <Tooltip label="Add" aria-label="Add" fontSize='md' bg='gray.50' color='teal.500' shadow='none'>
                        <IconButton
                            icon={<icons.plus size="2em" />}
                            variant="ghost"
                            colorScheme="black"
                            aria-label="Add"
                            onClick={() => navigate("/job/post")}
                        />
                    </Tooltip>
                    <Tooltip label='toggle view' aria-label="toggle view" fontSize='md' bg='gray.50' color='teal.500' shadow='none'>
                        <IconButton
                            icon={isCard ? <FaThLarge size="1.2em" /> : <FaList size="1.2em" />}
                            aria-label="list or card toggle"
                            variant="ghost"
                            colorScheme="black"
                            onClick={() => setIsCard(!isCard)}
                        />
                    </Tooltip>
                </Flex>
            </Flex>
            <Grid
                templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                gap={6}
            >
                {jobs.map((job, index) => (
                    <GridItem key={index}>
                        <JobCard job={job} />
                    </GridItem>
                ))}
            </Grid>
        </Flex>
    )
}

export default Display;