import { Button, Flex } from "@chakra-ui/react";
import { useDeleteResume, useResume } from "../hooks/resume";
import { useUpdateResume } from "../hooks/resume/useUpdateResume";
import Loading from "./Loading";
import { useState } from "react";

function Employer() {

    // const { updateResume, isLoading } = useUpdateResume();
    const { deleteResume, isLoading} = useDeleteResume();
    const { resume } = useResume()

    const [selectedFile, setSelectedFile] = useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files?.[0]);
        }
    }
    console.log(resume)

    const handleUpdate = async () => {
        // await updateResume({resume_file: selectedFile})
        await deleteResume();
    }
    return (
        <Flex minHeight='60vh' alignItems='center'>
            {isLoading && <Loading />}
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpdate}>Update</Button>
        </Flex>
    )
}
export default Employer;