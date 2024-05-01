import { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Tag,
    TagCloseButton,
    TagLabel,
} from "@chakra-ui/react";
import { useJobUpdate } from "../../hooks/job";
import Loading from "../../pages/Loading";

type ISEQProps = {
    id: number
    experience: string[];
    skills: string[];
    qualification: string[];
};

type SEQProps = Omit <ISEQProps, "id">

const SEQConfirmation = ({
    id,
    experience = [],
    skills = [],
    qualification = [],
}: ISEQProps) => {
    const { updateJob, isLoading } = useJobUpdate(id);
    const [update, setUpdate] = useState<SEQProps>({
        experience,
        skills,
        qualification,
    });
    const [newSkill, setNewSkill] = useState("");
    const [newQualification, setNewQualification] = useState("");
    const [newExperience, setNewExperience] = useState("");

    const handleChipDelete = (type: keyof SEQProps, value: string) => {
        setUpdate((prevUpdate) => {
            const updatedUpdate = { ...prevUpdate };
            updatedUpdate[type] = updatedUpdate[type].filter((item) => item !== value);
            return updatedUpdate;
        });
    };

    const handleAddItem = (type: keyof SEQProps, value: string) => {
        setUpdate((prevUpdate) => {
            const updatedUpdate = { ...prevUpdate };
            updatedUpdate[type] = [...updatedUpdate[type], value];
            return updatedUpdate;
        });
        resetInputs(type);
    };

    const resetInputs = (type: keyof SEQProps) => {
        if (type === "skills") {
            setNewSkill("");
        } else if (type === "qualification") {
            setNewQualification("");
        } else if (type === "experience") {
            setNewExperience("");
        }
    };

    const handleConfirm = async () => {
        // Handle confirm logic here
        console.log("Confirmed resume:", update);
        await updateJob(update)
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <Box>
            <Heading size="xl" my={4}>
                Skills
            </Heading>
            <Flex flexWrap="wrap" gap={2} mb={4}>
                {update?.skills.map((skill) => (
                    <Tag
                        key={skill}
                        colorScheme="blue"
                        cursor="pointer"
                        onClick={() => handleChipDelete("skills", skill)}
                    >
                        <TagLabel>{skill}</TagLabel>
                        <TagCloseButton />
                    </Tag>
                ))}
            </Flex>
            <Flex gap={2} mb={4}>
                <Input
                    placeholder="Add new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                />
                <Button colorScheme="blue" onClick={() => handleAddItem("skills", newSkill)}>
                    Add
                </Button>
            </Flex>

            <Heading size="xl" my={4}>
                Qualifications
            </Heading>
            <Flex flexWrap="wrap" gap={2} mb={4}>
                {update?.qualification.map((qualification) => (
                    <Tag
                        key={qualification}
                        colorScheme="blue"
                        cursor="pointer"
                        onClick={() => handleChipDelete("qualification", qualification)}
                    >
                        <TagLabel>{qualification}</TagLabel>
                        <TagCloseButton />
                    </Tag>
                ))}
            </Flex>
            <Flex gap={2} mb={4}>
                <Input
                    placeholder="Add new qualification"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                />
                <Button
                    colorScheme="blue"
                    onClick={() => handleAddItem("qualification", newQualification)}
                >
                    Add
                </Button>
            </Flex>

            <Heading size="xl" my={4}>
                Experience
            </Heading>
            <Flex flexWrap="wrap" gap={2} mb={4}>
                {update?.experience.map((experience) => (
                    <Tag
                        key={experience}
                        colorScheme="blue"
                        cursor="pointer"
                        onClick={() => handleChipDelete("experience", experience)}
                    >
                        <TagLabel>{experience}</TagLabel>
                        <TagCloseButton />
                    </Tag>
                ))}
            </Flex>
            <Flex gap={2} mb={4}>
                <Input
                    placeholder="Add new experience"
                    value={newExperience}
                    onChange={(e) => setNewExperience(e.target.value)}
                />
                <Button
                    colorScheme="blue"
                    onClick={() => handleAddItem("experience", newExperience)}
                >
                    Add
                </Button>
            </Flex>

            <Button colorScheme="green" onClick={handleConfirm}>
                Confirm
            </Button>
        </Box>
    );
};

export default SEQConfirmation;