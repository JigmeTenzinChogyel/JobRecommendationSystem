import { Box, Flex, Grid, GridItem, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import JobCard from "./JobCard";
import JobList from "./JobList";
import { JobResponse } from "../../hooks/job";

type Props = {
    title?: string
    jobs?: JobResponse[]
}
function JobDisplay({ jobs, title }: Props) {

    const [isCard, setIsCard] = useState<boolean>(true);

    if (!jobs || jobs.length === 0) {
        return <>No Jobs</>
    }

    return (
        <Flex px='5%' py='2%' gap={10} direction={{ base: "column", md: "row" }} position='relative' >
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
                            // user === "recruiter"
                            // &&
                            // <Button
                            //     variant="outline"
                            //     colorScheme="teal.200"
                            //     onClick={() => navigate("/job/post")}
                            //     display='flex'
                            //     alignItems='center'
                            //     _hover={{ backgroundColor: "gray.200" }}
                            // >Add</Button>
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
                                <JobCard job={job}/>
                            </GridItem>
                        ))}
                    </Grid>
                ) : (
                    <Box>
                        {jobs.map((job, index) => (
                            <JobList {...job} key={index}/>
                        ))}
                    </Box>
                )}
            </Flex>
        </Flex>

    )
}

export default JobDisplay;