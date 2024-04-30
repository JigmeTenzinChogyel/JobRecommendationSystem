import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "./Loading";
import { UseCreateResume } from "../hooks/resume";

function PostResume() {

    const { createResume, isLoading } = UseCreateResume();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files?.[0]);
        }
    }
    const onSubmit = async () => {
        // Handle form submission logic here
        // e.g., send resume file and form data to your backend API
        console.log(selectedFile);
        if (selectedFile !== null) {
            await createResume({ resume_file: selectedFile })

        }
    };

    return (
        <Box minH="90vh" display='flex' alignItems='center'>
            {isLoading && <Loading />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("resume_file", { required: true })} onChange={handleFileChange} />
                {errors.resume_file && <p className="error">{errors.resume_file.message}</p>}
                <button type="submit">Upload Resume</button>
            </form>
        </Box>
    );
}

export default PostResume;
