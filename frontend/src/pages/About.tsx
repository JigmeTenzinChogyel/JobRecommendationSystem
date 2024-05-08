import { Flex, Text } from "@chakra-ui/react";
import { Reveal } from "../components/animate/Reveal";

function About() {
  return (
    <Flex
      px="5%"
      py={5}
      pb="5%"
      gap={10}
      direction="column"
      position="relative"
      w={{ base: "100%", md: "75%" }}
    >
      <Reveal>
        <Text
          textAlign="center"
          fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
        >
          About Us
        </Text>
      </Reveal>
      <Reveal>
        <Text>
          Welcome to <b>Jobless</b>, your premier online platform for job seekers
          and recruiters in Bhutan. At <b>Jobless</b>, we're not just another job
          portal — we're revolutionizing the way people find jobs and recruit
          candidates.
          <br />
          <br />
          What sets us apart is our cutting-edge recommendation system, seamlessly
          integrated into our platform. Leveraging the power of machine learning
          and natural language processing, our recommendation system provides
          users with tailored suggestions that match their unique preferences and
          requirements.
          <br />
          <br />
          For job seekers, this means receiving personalized job recommendations
          based on the skills and experience outlined in their resume. Gone are
          the days of sifting through endless job listings; with Jobless, finding
          the perfect opportunity is easier than ever. Similarly, for recruiters,
          our recommendation system streamlines the hiring process by delivering
          candidate recommendations that align perfectly with the job descriptions
          they post. This saves valuable time and resources, allowing recruiters
          to focus on connecting with the best talent for their organizations.
          <br />
          <br />
          Whether you're searching for your dream job or seeking top talent to
          join your team, Jobless is here to make the process seamless and
          efficient. Join us today and experience the future of job searching and
          recruiting in Bhutan.
        </Text>
      </Reveal>

      {/* <Grid
        h="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg="tomato" /> 
        <GridItem rowSpan={2} colSpan={4} bg="papayawhip">


        </GridItem> 
      </Grid> */}
    </Flex>
  );
}

export default About;
