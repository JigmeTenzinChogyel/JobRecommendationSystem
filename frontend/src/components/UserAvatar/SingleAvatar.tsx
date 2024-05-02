import {
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Icon,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { MeResponse, useMeUpdate } from "../../hooks/user";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Loading from "../../pages/Loading";

function SingleAvatar(user: MeResponse) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [file, setFile] = useState<File | null>(null);
    const { updateMe, isLoading } = useMeUpdate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        console.log(file)
        if (file !== null) {
            await updateMe({ avatar: file });
            onClose();
            window.location.reload();
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Flex w="100%" position="relative" justify={{ base: "center", md: "left" }}>
            <Avatar
                size="2xl"
                pos="absolute"
                top="-16"
                left={{ base: "", md: "8" }}
                zIndex={12}
                borderColor="white"
                border="2px"
                src={user.avatar}
                name={user.name}
            />
            <Flex w="100%" justify="space-between" py="2%" px="3%" direction={{ base: "column", md: "row" }} gap={3}>
                <Box mt={{ base: "20%", md: "10%", lg: "4%" }} textAlign={{ base: "center", md: "left" }}>
                    <Heading fontSize="xl" mb={2}>
                        {user.name}
                    </Heading>
                    <Bio {...user} />
                </Box>
                <Button onClick={onOpen} variant="outline" colorScheme="teal">
                    Change Profile
                </Button>
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update Avatar</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isRequired>
                                <FormLabel>Avatar</FormLabel>
                                <Input id="avatar" name="avatar" type="file" onChange={handleFileChange} />
                                <FormHelperText>Update your profile avatar.</FormHelperText>
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
        </Flex>
    );
}

export default SingleAvatar;

const Bio = (user: MeResponse) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [bio, setBio] = useState<string>(user.bio || "");

    const { updateMe, isLoading } = useMeUpdate();

    const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBio(e.target.value);
    };
    const handleBioUpload = async () => {
        console.log(bio)
        if (bio !== user.bio && bio !== "") {
            await updateMe({ bio });
            onClose()
            window.location.reload();
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Flex align="center">
            {
                user.bio
                    ?
                    <Text as="i" fontSize="sm" textColor="gray.500">
                        {user.bio}
                    </Text>
                    :
                    <Text as="i" fontSize="sm" textColor="gray.500">Add Bio</Text>}
            <Tooltip label="Edit" aria-label="Edit">
                <IconButton
                    icon={<Icon as={FiEdit} />}
                    variant="ghost"
                    colorScheme="blue"
                    aria-label="Edit"
                    onClick={onOpen}
                />
            </Tooltip>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Avatar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>Bio</FormLabel>
                            <Input
                                id="bio"
                                name="bio"
                                type="text"
                                value={bio}
                                onChange={handleBioChange} />
                            <FormHelperText >Update your bio</FormHelperText>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleBioUpload}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}