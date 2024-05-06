import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import JobCard from "../components/job/JobCard";
import { useJobsByBookmark } from "../hooks/job";
import Loading from "./Loading";

function Bookmark() {

    const { jobs, isLoading } = useJobsByBookmark();
    if (isLoading) {
        return <Loading />
    }
    return (
        <Flex w="100%" direction="column" position='relative' py={2}>
            <Flex px="2%" pb="3%" w="100%" direction="column" position='relative' gap={2}>
                <Text fontSize='md' fontWeight='bold' textColor="teal">Bookmarks</Text>
                <Grid
                    templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
                    gap={6}
                >
                    {jobs?.map((job, index) => (
                        <GridItem key={index}>
                            <JobCard job={job} />
                        </GridItem>
                    ))}
                </Grid>
            </Flex>
        </Flex>
    )
}

export default Bookmark;