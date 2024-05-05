import { AbsoluteCenter, Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tag, TagLabel, Text, useDisclosure } from "@chakra-ui/react";
import { resumeResponseType, useUpdateResume } from "../../hooks/resume";
import Loading from "../../pages/Loading";
import NoResume from "./NoResume";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [file, setFile] = useState<File | null>(null);
    const { updateResume, isLoading  } = useUpdateResume();
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (file !== null) {
            await updateResume({ resume_file: file });
            onClose();
            navigate("/resume/confirm")
        }
    }
    if(isLoading) {
        return <Loading />
    }

    return (
        <Stack w="100%" spacing={6} py="2%" px="3%">
            <Flex align="center" justify="space-between">
                <Text fontSize="xl" textColor="teal" fontWeight="bold">Resume</Text>
                <Button onClick={onOpen} variant="outline" colorScheme="teal">
                    Update Resume
                </Button>
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update Resume</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isRequired>
                                <FormLabel>Resume</FormLabel>
                                <Input id="avatar" name="avatar" type="file" onChange={handleFileChange} />
                                <FormHelperText>Update your resume.</FormHelperText>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleFileUpload}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
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

