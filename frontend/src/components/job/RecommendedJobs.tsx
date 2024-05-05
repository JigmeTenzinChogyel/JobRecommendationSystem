import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Loading from "../../pages/Loading";
import NotFound from "../../pages/NotFound";
import JobCard from "./JobCard";
import { usePagination } from "../../providers/PaginationProvider";
import { Pagination } from "../pagination/Pagination";

function RecommendedJobs() {

    const { jobs, isLoading } = usePagination()

    if (isLoading) {
        return <Loading />
    }
    if (!jobs) {
        return <NotFound />
    }
    return (
        <>
            <Flex w="100%" direction="column" position='relative' my={3}>
                <Flex px="2%" pb="3%" w="100%" direction="column" position='relative' my={2}>
                    <Text fontSize='md' fontWeight='bold' textColor="teal">Recommendations</Text>
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
                    <Pagination />
                </Flex>
            </Flex>
        </>
    )
}

export default RecommendedJobs;