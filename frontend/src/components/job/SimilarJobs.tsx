import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useJobSimilar } from "../../hooks/job";
import Loading from "../../pages/Loading";
import NotFound from "../../pages/NotFound";
import JobCard from "./JobCard";

type Props = {
    id: number
}
function SimilarJobs({ id }: Props) {

    const { jobs, isLoading } = useJobSimilar(id);

    if (isLoading) {
        return <Loading />
    }
    if (!jobs) {
        return <NotFound />
    }
    return (
        <>
            <Flex w="100%" direction="column" position='relative'>
                <Flex px="2%" pb="3%" w="100%" direction="column" position='relative'>
                    <Text fontSize='md' fontWeight='bold' textColor="teal">Similar Jobs</Text>
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
            </Flex>
        </>
    )
}

export default SimilarJobs;