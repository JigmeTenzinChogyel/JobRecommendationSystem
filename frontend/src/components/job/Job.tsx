import { Box, Flex, Grid, GridItem, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { jobData } from "./JobData";
import { FaList, FaThLarge } from "react-icons/fa"; // Import icons for list and card view
import JobCard from "./JobCard";
import JobList from "./JobList";

function Job() {

    const [isCard, setIsCard] = useState<boolean>(true);

    return (
        <Flex direction="column" gap={8} w={{ base: "100%", md: "75%" }}>
            <Flex align="center" justify="space-between">
                <Text fontSize='xl' fontWeight='bold'>Avaliable Jobs</Text>
                {/* Toggle display type */}
                <Flex align="center">
                    <IconButton 
                        icon={ isCard ? <FaThLarge/> : <FaList />} 
                        aria-label="list or card toggle" 
                        variant='none'
                        onClick={() => setIsCard(!isCard)}
                        />
                </Flex>
            </Flex>
            {isCard ? (
                <Grid
                    templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                    gap={6}
                >
                    {jobData.map((job, index) => (
                        <GridItem key={index}>
                            <JobCard
                                title={job.title}
                                description={job.description}
                                location={job.location}
                                salary={job.salary}
                                deadline={job.deadline}
                            />
                        </GridItem>
                    ))}
                </Grid>
            ) : (
                <Box>
                    {jobData.map((job, index) => (
                        <JobList
                            key={index}
                            title={job.title}
                            description={job.description}
                            location={job.location}
                            salary={job.salary}
                            deadline={job.deadline}
                        />
                    ))}
                </Box>
            )}
        </Flex>
    );
}

export default Job;
