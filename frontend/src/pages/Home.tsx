import { Stats } from "../components/Hero/Stats";
import {
  Grid,
  GridItem,
  Text,
  Heading,
  Stack,
  Divider,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Flex
        px="5%"
        py="2%"
        gap={10}
        direction="column"
        position="relative"
        w={{ base: "100%", md: "75%" }}
        // bg='red.200'
      >
        <Text
          textAlign="center"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
        >
          How it Works
        </Text>
        <Divider />

        <div>
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Are you a job seeker?
          </Heading>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
            my={2}
          >
            <Card border="1px">
              <CardHeader pb="1px">
                <Heading size="md" textColor="teal.400">
                  {" "}
                  Step 1: <br />
                  Register/Login
                </Heading>
              </CardHeader>

              <CardBody mt="1px">
                <Text>
                  Register or log in to our platform to access personalized job
                  recommendations tailored to your skills and experience.
                </Text>
              </CardBody>
            </Card>

            <Card border="1px">
              <CardHeader pb="1px">
                <Heading size="md" textColor="teal.400">
                  {" "}
                  Step 2: <br />
                  Upload your resume
                </Heading>
              </CardHeader>

              <CardBody mt="1px">
                <Text>
                  Upload your CV to showcase your qualifications to potential
                  employers and increase your chances of landing your dream job.
                </Text>
              </CardBody>
            </Card>

            <Card border="1px">
              <CardHeader pb="1px">
                <Heading size="md" textColor="teal.400">
                  {" "}
                  Step 3: <br />
                  Get Job Recommendations
                </Heading>
              </CardHeader>

              <CardBody mt="1px">
                <Text>
                  Get personalized job recommendations based on your preferences
                  and career goals. Let us help you find the perfect job
                  opportunity.
                </Text>
              </CardBody>
            </Card>

            <Card border="1px">
              <CardHeader pb="1px">
                <Heading size="md" textColor="teal.400">
                  {" "}
                  Step 4: <br />
                  Apply Quickly
                </Heading>
              </CardHeader>

              <CardBody mt="1px">
                <Text>
                  Apply to job listings with ease and speed. Our platform
                  simplifies the application process, helping you land your next
                  job faster.
                </Text>
              </CardBody>
            </Card>
          </Grid>
        </div>

        <div>
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Are you a recruiter?
          </Heading>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
            my={2}
          >
            <Card border="1px">
              <CardHeader pb="1px">
                <Heading size="md" textColor="teal.400">
                  {" "}
                  Step 1: <br />
                  Register/Login
                </Heading>
              </CardHeader>

              <CardBody mt="1px">
                <Text>
                  Access our platform by registering or logging in with your
                  email. Start your journey to finding the perfect candidates
                  for your job vacancies.
                </Text>
              </CardBody>
            </Card>

            <Card border="1px">
              <CardHeader pb="1px">
                <Heading size="md" textColor="teal.400">
                  {" "}
                  Step 2: <br />
                  Post Job Vacancy
                </Heading>
              </CardHeader>

              <CardBody mt="1px">
                <Text>
                  Create and publish job listings with detailed descriptions.
                  Reach a wide pool of talented candidates and attract top
                  talent to your organization.
                </Text>
              </CardBody>
            </Card>

            <Card border="1px">
              <CardHeader pb="1px">
                <Heading size="md" textColor="teal.400">
                  {" "}
                  Step 3: <br />
                  Get Candidate Recommendations
                </Heading>
              </CardHeader>

              <CardBody mt="1px">
                <Text>
                  Receive personalized candidate recommendations based on your
                  job requirements. Let our platform streamline your hiring
                  process and find the perfect fit for your team.
                </Text>
              </CardBody>
            </Card>

            <Card border="1px">
              <CardHeader pb="1px">
                <Heading size="md" textColor="teal.400">
                  {" "}
                  Step 4: <br />
                  Review and Hire
                </Heading>
              </CardHeader>

              <CardBody mt="1px">
                <Text>
                  Review candidate profiles, schedule interviews, and make
                  informed hiring decisions. Our platform simplifies the hiring
                  process, allowing you to build a strong team efficiently.
                </Text>
              </CardBody>
            </Card>
          </Grid>
        </div>

        <Text
          textAlign="center"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          mt='2%'
        >
          Empowering Careers: See Our Impact
        </Text>
        <Divider />

        <div>
    <Grid 
     templateColumns={{
      base: "repeat(1, 1fr)",
      md: "repeat(1, 1fr)",
      lg: "repeat(3, 1fr)",
    }}
    gap={6} my={2}>
      <GridItem w="100%" h="200px" p={4} borderRadius="md">
        <Text
          fontSize="1xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          Registered Users
        </Text>
        <Text
          fontSize="8xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          1200
        </Text>
      </GridItem>

      <GridItem w="100%" h="200px" p={4} borderRadius="md">
        <Text
          fontSize="1xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          Successful Job Matches
        </Text>
        <Text
          fontSize="8xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          589
        </Text>
      </GridItem>

      <GridItem w="100%" h="200px" p={4} borderRadius="md">
        <Text
          fontSize="1xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          Open Job Vancancy
        </Text>
        <Text
          fontSize="8xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          780
        </Text>
      </GridItem>
    </Grid>
  </div>

      </Flex>
    </>
  );
}

export default Home;

<Stack spacing={3} align="center" px={10} my={5}>
 

  <Heading as="h2" size="2xl" mt={10} textAlign="center">
    Empowering Careers: See Our Impact
  </Heading>
  <Divider />

  <div>
    <Grid templateColumns="repeat(3, 1fr)" gap={6} my={2}>
      <GridItem w="100%" h="200px" p={4} borderRadius="md">
        <Text
          fontSize="1xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          Registered Users
        </Text>
        <Text
          fontSize="8xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          1200
        </Text>
      </GridItem>

      <GridItem w="100%" h="200px" p={4} borderRadius="md">
        <Text
          fontSize="1xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          Successful Job Matches
        </Text>
        <Text
          fontSize="8xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          589
        </Text>
      </GridItem>

      <GridItem w="100%" h="200px" p={4} borderRadius="md">
        <Text
          fontSize="1xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          Open Job Vancancy
        </Text>
        <Text
          fontSize="8xl"
          textColor="teal.400"
          fontWeight="bold"
          textAlign="center"
        >
          780
        </Text>
      </GridItem>
    </Grid>
  </div>
</Stack>;
