import { AbsoluteCenter, Box, Divider, Flex, Heading, Link, Stack, Tag, TagLabel, Text } from "@chakra-ui/react";
import { resumeResponseType } from "../../hooks/resume";
import Loading from "../../pages/Loading";
import NoResume from "./NoResume";
import { ExternalLinkIcon } from "@chakra-ui/icons";


type Props = {
    resume?: resumeResponseType
    isLoading?: boolean
}
const ResumeDetails = ({ resume, isLoading }: Props) => {

    if (isLoading) {
        return <Loading />
    }

    if (!resume) {
        return (
            <>
                <NoResume />
            </>
        )
    }
    return (
        <>
            <Detail {...resume} />
        </>
    );
};

export default ResumeDetails;

export const Detail = (resume: resumeResponseType) => {
    return (
        <Stack w="100%" spacing={6} py="2%" px="3%">
            <Text fontSize="xl" textColor="teal" fontWeight="bold">Resume</Text>
            <Link href={resume.resume_file} textDecoration="underline" textColor="blue.600" isExternal>
                Resume File <ExternalLinkIcon mx='2px' />
            </Link>
            <Box>
                <Heading as="h3" size="sm" mb={2} color="teal.600">
                    Experience:
                </Heading>
                <Flex flexWrap="wrap" gap={2}>
                    {resume.experience && resume.experience.length !== 0
                        ? resume.experience.map((exp, index) => (
                            <Tag size="md" key={index} variant='outline' textColor="black" colorScheme='teal'>
                                <TagLabel>{exp}</TagLabel>
                            </Tag>
                        ))
                        : <Text color="gray.500">No Experience</Text>}
                </Flex>
            </Box>
            <Box>
                <Heading as="h3" size="sm" mb={2} color="teal.600">
                    Qualifications:
                </Heading>
                <Flex flexWrap="wrap" gap={2}>
                    {resume.qualification && resume.qualification.length !== 0
                        ? resume.qualification.map((qual, index) => (
                            <Tag size="md" key={index} variant='outline' textColor="black" colorScheme='teal'>
                                <TagLabel>{qual}</TagLabel>
                            </Tag>
                        ))
                        : <Text color="gray.500">No Qualifications</Text>}
                </Flex>
            </Box>
            <Box>
                <Heading as="h3" size="sm" mb={2} color="teal.600">
                    Skills:
                </Heading>
                <Flex flexWrap="wrap" gap={2}>
                    {resume.skills && resume.skills.length !== 0
                        ? resume.skills.map((skill, index) => (
                            <Tag size="md" key={index} variant='outline' textColor="black" colorScheme='teal'>
                                <TagLabel>{skill}</TagLabel>
                            </Tag>
                        ))
                        : <Text color="gray.500">No Skills</Text>}
                </Flex>
            </Box>
            <Box position='relative' padding='10'>
                <Divider />
                <AbsoluteCenter bg='white' px='4'>
                    END
                </AbsoluteCenter>
            </Box>
        </Stack>
    );

}

