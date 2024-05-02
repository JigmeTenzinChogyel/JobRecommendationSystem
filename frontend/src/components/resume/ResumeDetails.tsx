import { AbsoluteCenter, Box, Divider, Heading, Link, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
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
                <UnorderedList spacing={2}>
                    {resume.experience && resume.experience.length !== 0
                        ? resume.experience.map((exp, index) => (
                            <ListItem key={index} color="gray.700">
                                {exp}
                            </ListItem>
                        ))
                        : <Text color="gray.500">No Experience</Text>}
                </UnorderedList>
            </Box>
            <Box>
                <Heading as="h3" size="sm" mb={2} color="teal.600">
                    Qualifications:
                </Heading>
                <UnorderedList spacing={2}>
                    {resume.qualification && resume.qualification.length !== 0
                        ? resume.qualification.map((qual, index) => (
                            <ListItem key={index} color="gray.700">
                                {qual}
                            </ListItem>
                        ))
                        : <Text color="gray.500">No Qualifications</Text>}
                </UnorderedList>
            </Box>
            <Box>
                <Heading as="h3" size="sm" mb={2} color="teal.600">
                    Skills:
                </Heading>
                <UnorderedList spacing={2}>
                    {resume.skills && resume.skills.length !== 0
                        ? resume.skills.map((skill, index) => (
                            <ListItem key={index} color="gray.700">
                                {skill}
                            </ListItem>
                        ))
                        : <Text color="gray.500">No Skills</Text>}
                </UnorderedList>
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

