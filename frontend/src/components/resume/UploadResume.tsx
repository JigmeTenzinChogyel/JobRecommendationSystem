import { Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import Loading from "../../pages/Loading";
import { UseCreateResume } from "../../hooks/resume";

function UploadResume() {

    const { createResume, isLoading } = UseCreateResume();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files?.[0]);
        }
    }
    const handleSubmit = async () => {
        if (selectedFile !== null) {
            await createResume({ resume_file: selectedFile })
            onClose
        }
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Button
                variant="outline"
                colorScheme="teal"
                onClick={onOpen}            >
                Upload Resume
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textColor="teal">Upload Resume</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Resume</FormLabel>
                            <Input
                                id="resume_file"
                                name="resume_file"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <FormHelperText>Ensure that your resume is up-to-date</FormHelperText>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            colorScheme="teal"
                            variant='outline'
                            onClick={handleSubmit}>Upload</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UploadResume;
