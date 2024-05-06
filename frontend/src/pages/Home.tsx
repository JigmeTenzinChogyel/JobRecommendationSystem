import { Stats } from "../components/Hero/Stats";
import {
  Grid,
  GridItem,
  Text,
  Heading,
  Stack,
  Divider,
} from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Stack spacing={3} align="center" px={10} my={5}>
        <Heading as="h2" size="2xl" mt={5} textAlign="center">
          How it Works
        </Heading>
        <Divider />
      

        <div>
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Are you a recruiter?
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={6} my={2}>
            <GridItem w="100%" h="300px" border="1px" p={2} borderRadius="md">
              <Text fontSize="2xl" textColor="teal.400" fontWeight="bold">
                01 <br />
                Register/Login
              </Text>{" "}
              <br />
              <p>
                Access our platform by registering or logging in with your
                email. Start your journey to finding the perfect candidates for
                your job vacancies.
              </p>
            </GridItem>
            <GridItem w="100%" h="300px" border="1px" p={2} borderRadius="md">
              <Text fontSize="2xl" textColor="teal.400" fontWeight="bold">
                02 <br />
                Post Job Vacancies
              </Text>{" "}
              <br />
              <p>
                Create and publish job listings with detailed descriptions.
                Reach a wide pool of talented candidates and attract top talent
                to your organization.
              </p>
            </GridItem>
            <GridItem w="100%" h="300px" border="1px" p={2} borderRadius="md">
              <Text fontSize="2xl" textColor="teal.400" fontWeight="bold">
                03 <br />
                Get Candidate Recommendations
              </Text>{" "}
              <br />
              <p>
                Receive personalized candidate recommendations based on your job
                requirements. Let our platform streamline your hiring process
                and find the perfect fit for your team.
              </p>
            </GridItem>
            <GridItem w="100%" h="300px" border="1px" p={2} borderRadius="md">
              <Text fontSize="2xl" textColor="teal.400" fontWeight="bold">
                04 <br />
                Review and Hire
              </Text>{" "}
              <br />
              <p>
                Review candidate profiles, schedule interviews, and make
                informed hiring decisions. Our platform simplifies the hiring
                process, allowing you to build a strong team efficiently.
              </p>
            </GridItem>
          </Grid>
        </div>

        <div>
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Are you a job seeker?
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={6} my={2}>
            <GridItem w="100%" h="300px" border="1px" p={2} borderRadius="md">
              <Text fontSize="2xl" textColor="teal.400" fontWeight="bold">
                01 <br />
                Register/Login
              </Text>{" "}
              <br />
              <p>
                Register or log in to our platform to access personalized job
                recommendations tailored to your skills and experience.
              </p>
            </GridItem>
            <GridItem w="100%" h="300px" border="1px" p={2} borderRadius="md">
              <Text fontSize="2xl" textColor="teal.400" fontWeight="bold">
                02 <br />
                Upload Your CV
              </Text>{" "}
              <br />
              <p>
                Upload your CV to showcase your qualifications to potential
                employers and increase your chances of landing your dream job.
              </p>
            </GridItem>
            <GridItem w="100%" h="300px" border="1px" p={2} borderRadius="md">
              <Text fontSize="2xl" textColor="teal.400" fontWeight="bold">
                03 <br />
                Receive Job Recommendations
              </Text>{" "}
              <br />
              <p>
                Get personalized job recommendations based on your preferences
                and career goals. Let us help you find the perfect job
                opportunity.
              </p>
            </GridItem>
            <GridItem w="100%" h="300px" border="1px" p={2} borderRadius="md">
              <Text fontSize="2xl" textColor="teal.400" fontWeight="bold">
                04 <br />
                Apply Quickly
              </Text>{" "}
              <br />
              <p>
                Apply to job listings with ease and speed. Our platform
                simplifies the application process, helping you land your next
                job faster.
              </p>
            </GridItem>
          </Grid>
        </div>

        <Heading as="h2" size="2xl" mt={10} textAlign="center">
          Empowering Careers: See Our Impact
        </Heading>
        <Divider />

        <div>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} my={2}>

            <GridItem w="100%" h="200px"  p={4} borderRadius="md">
              <Text fontSize="1xl"  textColor="teal.400"  fontWeight="bold" textAlign="center">
                Registered Users
              </Text>
              <Text fontSize="8xl" textColor="teal.400" fontWeight="bold" textAlign="center">
                1200
              </Text>

            </GridItem>

            <GridItem w="100%" h="200px"  p={4} borderRadius="md">
              <Text fontSize="1xl" textColor="teal.400" fontWeight="bold" textAlign="center">
              Successful Job Matches
              </Text>
              <Text fontSize="8xl" textColor="teal.400" fontWeight="bold" textAlign="center">
                589
              </Text>
            </GridItem>

            <GridItem w="100%" h="200px" p={4} borderRadius="md">
              <Text fontSize="1xl" textColor="teal.400" fontWeight="bold" textAlign="center">
              Open Job Vancancy
              </Text>
              <Text fontSize="8xl" textColor="teal.400" fontWeight="bold" textAlign="center">
                780
              </Text>
            </GridItem>

          </Grid>
        </div>
      </Stack>
    </>
  );
}

export default Home;
