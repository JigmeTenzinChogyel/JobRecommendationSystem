import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useJobs } from "../../hooks/job";
import Loading from "../../pages/Loading";
import JobCard from "./JobCard";

function RandomJobs() {

    const { jobs, isLoading } = useJobs(true)

    if (isLoading) {
        return <Loading />
    }

    if (jobs) {

        return (
            <Flex p="2%" w="100%" direction="column" position='relative' gap={5}>
                <Text fontSize='md' fontWeight='bold' textColor="teal">Avaliable Jobs</Text>
                <Grid
                    templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
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

    return (
        <>Error</>
    )
}

export default RandomJobs;