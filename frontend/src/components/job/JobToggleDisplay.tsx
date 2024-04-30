import { Box, Button, Flex, Grid, GridItem, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import JobCard from "./JobCard";
import JobList from "./JobList";
import { Job } from "../types/Types";
import Filter from "../filter/Filter";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string
    jobs: Job[]
}
function JobToggleDisplay({ jobs, title }: Props) {

    const [isCard, setIsCard] = useState<boolean>(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <Flex px='5%' py='2%' gap={10} direction={{ base: "column", md: "row" }} position='relative' >
            <Filter />
            <Flex direction="column" gap={8} w={{ base: "100%", md: "75%" }}>
                <Flex align="center" justify="space-between">
                    <Text fontSize='xl' fontWeight='bold'>{title}</Text>

                    <Flex gap={6}>
                        {/* Toggle display type */}
                        <Flex align="center">
                            <IconButton
                                icon={isCard ? <FaThLarge /> : <FaList />}
                                aria-label="list or card toggle"
                                variant='none'
                                onClick={() => setIsCard(!isCard)}
                                size='xl'
                            />
                        </Flex>
                        {
                            user === "recruiter"
                            &&
                            <Button
                                variant="outline"
                                colorScheme="teal.200"
                                onClick={() => navigate("/job/post")}
                                display='flex'
                                alignItems='center'
                                _hover={{ backgroundColor: "gray.200" }}
                            >Add</Button>
                        }

                    </Flex>
                </Flex>

                {isCard ? (
                    <Grid
                        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                        gap={6}
                    >
                        {jobs.map((job, index) => (
                            <GridItem key={index}>
                                <JobCard
                                    id={job.id}
                                    title={job.title}
                                    description={job.description}
                                    location={job.location}
                                    salary={job.salary}
                                    deadline={job.deadline}
                                    experience={[""]}
                                    skills={[""]}
                                    qualification={[""]}
                                />
                            </GridItem>
                        ))}
                    </Grid>
                ) : (
                    <Box>
                        {jobs.map((job, index) => (
                            <JobList
                                id={job.id}
                                key={index}
                                title={job.title}
                                description={job.description}
                                location={job.location}
                                salary={job.salary}
                                deadline={job.deadline}
                                experience={[""]}
                                skills={[""]}
                                qualification={[""]}
                            />
                        ))}
                    </Box>
                )}
            </Flex>
        </Flex>

    )
}

export default JobToggleDisplay;