import { Flex, Text, Box, Icon, IconButton, Tooltip, Image, Divider, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { CompanyResponse } from '../../hooks/company/type';
import CompanyForm from '../forms/CompanyForm';
import Loading from '../../pages/Loading';

type Props = {
  company?: CompanyResponse
  isLoading?: boolean
}
const CompanyDetails = ({ company, isLoading }: Props) => {

  if(isLoading) {
    return <Loading />
  }

  if (!company) {
    return (
      <>
        <NotCompany />
      </>
    )
  }
  return (
    <Flex w="100%" direction="column" mb={4} px="3%" py="1%">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="bold" textColor="gray.600">Company Details</Text>
        <Box>
          <Tooltip label="Edit" aria-label="Edit">
            <IconButton
              icon={<Icon as={FiEdit} />}
              variant="ghost"
              colorScheme="blue"
              aria-label="Edit"
            />
          </Tooltip>
        </Box>
      </Flex>
      <Flex gap={5} direction={{ base: "column", md: "row" }} align="center">
        <Image
          borderRadius='xl'
          boxSize='160px'
          src={company.logo}
          alt='Dan Abramov'
        />
        <Flex w="100%" direction="column" gap={1} py="2px" textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="lg">{company.name}</Text>
          <Text fontSize="xs" textColor="gray.500" as="i">{company.email}</Text>
          <Divider my={1} />
          <Text flexGrow="1" fontSize="sm" textColor="gray.600">{company.description}</Text>
          <Text fontSize="xs">{`${company.city}, ${company.country}`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CompanyDetails;

const NotCompany = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex w="100%" direction="column" mb={4} px="3%" py="1%">
        <Text fontWeight="bold" textColor="gray.600">Company Details</Text>
        <Flex w="100%" direction="column" align="center" gap={3} mt={5}>
          <Text>No Company!</Text>
          <Button variant="outline" onClick={onOpen}>Add</Button>
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={{base: "full", md: "xl"}}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader my={1}>Add Company</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={4}>
                <CompanyForm onClose={onClose}/>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </>
  )
}