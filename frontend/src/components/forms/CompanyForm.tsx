import { useForm } from 'react-hook-form';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Flex,
} from '@chakra-ui/react';
import { CompanyCreateType } from '../../hooks/company/type';
import "./form.css"
import { useCompanyCreate } from '../../hooks/company/useCompanyCreate';
import Loading from '../../pages/Loading';

type Props = {
    onClose?(): void
}
const CompanyForm = ({ onClose }: Props) => {

    const { createCompany, isLoading } = useCompanyCreate();
    const { register, handleSubmit } = useForm<CompanyCreateType>();

    const onSubmit =  async (data: CompanyCreateType) => {
        console.log(data);
        await createCompany({...data, logo:data.logo[0]});
        onClose && onClose()
        window.location.reload();
    };

    if (isLoading) {
        return <Loading />
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" p={3} gap={3}>
                <FormControl isRequired mb={4}>
                    <FormLabel>Company Name</FormLabel>
                    <Input {...register('name')} />
                </FormControl>

                <FormControl isRequired mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" {...register('email')} />
                </FormControl>

                <FormControl isRequired mb={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea {...register('description')} />
                </FormControl>

                <Flex>
                    <FormControl isRequired mr={4} mb={4}>
                        <FormLabel>City</FormLabel>
                        <Input {...register('city')} />
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Country</FormLabel>
                        <Input {...register('country')} />
                    </FormControl>
                </Flex>

                <FormControl isRequired mb={4}>
                    <FormLabel>Logo</FormLabel>
                    <Input 
                        type="file" 
                        {...register('logo')} />
                </FormControl>

                <Button colorScheme="blue" type="submit" w="100%">
                    Submit
                </Button>
            </Flex>
        </form>
    );
};

export default CompanyForm;