import { Card, CardBody, CardHeader, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"

export const Working = () => {

    const seeker = [
        {
            title: "Register/Login",
            desc: "Register or log in to our platform to access personalized job recommendations tailored to your skills and experience."
        },
        {
            title: "Upload your resume",
            desc: "Upload your CV to showcase your qualifications to potential employers and increase your chances of landing your dream job."
        },
        {
            title: "Get Job Recommendations",
            desc: "Get personalized job recommendations based on your preferences and career goals. Let us help you find the perfect job opportunity."
        },
        {
            title: "Apply Quickly",
            desc: "Apply to job listings with ease and speed. Our platform simplifies the application process, helping you land your next job faster."
        },
    ]

    const recruiter = [
        {
            title: "Register/Login",
            desc: "Access our platform by registering or logging in with your email. Start your journey to finding the perfect candidates for your job vacancies.",
        },
        {
            title: "Post Job Vacancy",
            desc: "Create and publish job listings with detailed descriptions. Reach a wide pool of talented candidates and attract top talent to your organization.",
        },
        {
            title: "Get Candidate Recommendations",
            desc: "Receive personalized candidate recommendations based on your job requirements. Let our platform streamline your hiring process and find the perfect fit for your team.",
        },
        {
            title: "Review and Hire",
            desc: "Review candidate profiles, schedule interviews, and make informed hiring decisions. Our platform simplifies the hiring process, allowing you to build a strong team efficiently.",
        },
    ]

    return (
        <>
            <Text
                textAlign="center"
                fontSize={{ base: "large", md: "larger" }}
                fontWeight="bold"
            >
                How it Works
            </Text>
            <Tabs variant='enclosed-colored' colorScheme="teal" p={2}>
                <TabList w="100%" justifyContent="center" gap={4}>
                    <Tab>Seeker</Tab>
                    <Tab>Recruiter</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid
                            templateColumns={{
                                base: "repeat(1, 1fr)",
                                md: "repeat(4, 1fr)",
                            }}
                            gap={4}
                        >
                            {
                                seeker.map((data, index) => (
                                    <GridItem key={index}>
                                        <Card
                                            minH="180px"
                                        >
                                            <CardHeader>
                                                <Text fontSize="xs">Step {index + 1}</Text>
                                                <Text fontSize="sm" textColor="teal.400" fontWeight="semibold">{data.title}</Text>
                                            </CardHeader>
                                            <CardBody fontSize="xs" textColor="gray.600">
                                                <Text>{data.desc}</Text>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <Grid
                            templateColumns={{
                                base: "repeat(1, 1fr)",
                                md: "repeat(4, 1fr)",
                            }}
                            gap={4}
                        >
                            {
                                recruiter.map((data, index) => (
                                    <GridItem key={index}>
                                        <Card
                                            minH="180px"
                                        >
                                            <CardHeader>
                                                <Text fontSize="xs">Step {index + 1}</Text>
                                                <Text fontSize="sm" textColor="teal.400" fontWeight="semibold">{data.title}</Text>
                                            </CardHeader>
                                            <CardBody fontSize="xs" textColor="gray.600">
                                                <Text>{data.desc}</Text>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}