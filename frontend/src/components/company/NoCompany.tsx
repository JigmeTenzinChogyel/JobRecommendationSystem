import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import CompanyForm from "../forms/CompanyForm"

type Props = {
    prompt?: string
    title?: boolean
}

export const NoCompany = ({ prompt, title }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Flex flexGrow="1" w="100%"  direction="column" px="3%" py="1%">
                {
                    title
                    &&
                    <Text fontWeight="bold" textColor="gray.600">Company Details</Text>
                }
                <Flex w="100%" direction="column" align="center" justify="center" flexGrow="1" gap={3} mt={5}>
                    <Text>{prompt ? prompt : "No Company!"}</Text>
                    <Button variant="outline" onClick={onOpen}>Add</Button>
                    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "xl" }}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader my={1}>Add Company Details</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={4}>
                                <CompanyForm onClose={onClose} />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Flex>
            </Flex>
        </>
    )
}