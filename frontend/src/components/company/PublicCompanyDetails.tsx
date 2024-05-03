import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { CompanyResponse } from "../../hooks/company";
import Loading from "../../pages/Loading";
import { NoCompany } from "./NoCompany";
import { FaMapMarkerAlt } from "react-icons/fa";

type Props = {
  company?: CompanyResponse
  isLoading?: boolean
}
export const PublicCompanyDetails = ({ company, isLoading }: Props) => {

  if (isLoading) {
    return <Loading />
  }

  if (!company) {
    return (
      <>
        <NoCompany title={true} />
      </>
    )
  }
  return (
    <Flex w="100%" direction="column" mb={4} px="3%" py="1%">
      <Text fontWeight="bold" textColor="gray.600">Company</Text>
      <Flex gap={5} direction="column" align="center">
        <Image
          borderRadius='xl'
          boxSize='160px'
          src={company.logo}
          alt='Dan Abramov'
        />
        <Flex w="100%" direction="column" gap={2} py="2px" textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="sm" color="teal">{company.name}</Text>
          <Text fontSize="xs" textColor="gray.500" as="i">{company.email}</Text>
          <Text fontSize="xs"><Icon color="teal" as={FaMapMarkerAlt} /> {`${company.city}, ${company.country}`}</Text>
          <Text fontSize="sm" textColor="gray.600">{company.description}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};