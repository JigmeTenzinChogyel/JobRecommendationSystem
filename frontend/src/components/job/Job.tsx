import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import JobCard from "./JobCard";

function Job() {
    const jobData = [
        {
            title: 'Software Engineer',
            description: "The quick brown fox jumps over the lazy dog is an English-language pangram a sentence that contains all of the letters of the English alphabet. Owing to its existence, Chakra was created.",
            location: 'San Francisco, CA',
            salary: 12000,
            deadline: new Date(),
        },
        {
            title: 'Software Engineer',
            description: "The quick brown fox jumps over the lazy dog is an English-language pangram a sentence that contains all of the letters of the English alphabet. Owing to its existence, Chakra was created.",
            location: 'San Francisco, CA',
            salary: 12000,
            deadline: new Date(),
        },
        {
            title: 'Software Engineer',
            description: "The quick brown fox jumps over the lazy dog is an English-language pangram a sentence that contains all of the letters of the English alphabet. Owing to its existence, Chakra was created.",
            location: 'San Francisco, CA',
            salary: 12000,
            deadline: new Date(),
        },
        {
            title: 'Software Engineer',
            description: "The quick brown fox jumps over the lazy dog is an English-language pangram a sentence that contains all of the letters of the English alphabet. Owing to its existence, Chakra was created.",
            location: 'San Francisco, CA',
            salary: 12000,
            deadline: new Date(),
        },
    ]

    return (
        <Flex direction='column' gap={8}>
            <Flex justify='space-between' align='center'>
                <Text>Avaliable Jobs</Text>
                <Text>Display type</Text>
            </Flex>
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
        </Flex>
    )
}

export default Job;