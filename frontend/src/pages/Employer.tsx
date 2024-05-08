import { Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { useCompanies } from "../hooks/company";
import Loading from "./Loading";
import { CompanyCard } from "../components/company/CompanyCard";

function Employer() {

    const { companies, isLoading } = useCompanies();
    console.log(companies)

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack w="100%" spacing={6} py="2%" px="3%">
                <Flex align="center" justify="space-between">
                    <Text fontSize="xl" textColor="teal" fontWeight="bold">Employers</Text>
                </Flex>
                <Grid
                    templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
                >
                    {companies?.map((company, index) => (
                        <GridItem key={index}>
                            <CompanyCard company={company} />
                        </GridItem>
                    ))}
                </Grid>
            </Stack>
        </>
    )
}
export default Employer;