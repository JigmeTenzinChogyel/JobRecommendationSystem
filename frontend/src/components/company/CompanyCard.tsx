import { Card, CardBody, CardHeader, Image, Text } from "@chakra-ui/react"
import { CompanyResponse } from "../../hooks/company"

type Props = {
    company: CompanyResponse
}

export const CompanyCard = ({ company }: Props) => {
    return (
        <Card 
            maxW="250px"
            minW="200px"
            cursor="pointer"
            textAlign="center"
        >
            <CardHeader display="flex" justifyContent="center">
                <Image
                    boxSize='100px'
                    src={company.logo}
                    alt={company.name}
                />
            </CardHeader>
            <CardBody>
                <Text fontSize="medium" fontWeight="bold" textColor="teal">{company.name}</Text>
                <Text fontSize="xs" textColor="gray.500" as="i">{company.email}</Text>
            </CardBody>
        </Card>
    )
}