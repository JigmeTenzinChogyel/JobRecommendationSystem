import {
  Grid,
  GridItem,
  Avatar,
  chakra,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Reveal } from "../animate/Reveal";

export const TestimonialContnet = () => {
  const testimony = [
    {
      title: "Sonam Dema",
      role: "Recruitment Lead, New Edge",
      desc: "Jobless has transformed our hiring process! The candidate recommendations provided by the platform have been spot-on, saving us valuable time and resources.",
    },
    {
      title: "Thinley Choden",
      role: "Job Seeker",
      desc: "Jobless exceeded my expectations! I was amazed by how accurately the platform matched me with relevant job opportunities based on my skills and experience.",
    },
    {
      title: "Hemanth Lepcha",
      role: "HR Manager, Thimphu Tech",
      desc: "Jobless is a game-changer for recruiters. The quality of candidate recommendations we receive is unparalleled, making the hiring process faster and more efficient than ever before.",
    },
  ];

  return (
    <>
      <Reveal width="100%">
        <Text
          textAlign="center"
          fontSize={{ base: "large", md: "x-large" }}
          fontWeight="bold"
        >
          Our Clients Speak
        </Text>
      </Reveal>
      <Reveal width="100%">
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={4}
          pb="2%"
          px={2}
        >
          {testimony.map((data, index) => (
            <GridItem key={index}>
              <Flex
                boxShadow={"lg"}
                maxW={"640px"}
                direction={{ base: "column-reverse", md: "row" }}
                width={"full"}
                rounded={"xl"}
                p={10}
                justifyContent={"space-between"}
                position={"relative"}
              >
                <Flex
                  direction={"column"}
                  textAlign={"left"}
                  justifyContent={"space-between"}
                >
                  <chakra.p fontSize="xs" textColor="gray.600" pb={4}>
                    {data.desc}
                  </chakra.p>
                  <chakra.p
                    fontSize="sm"
                    textColor="teal.400"
                    fontWeight="semibold"
                  >
                    {data.title}
                    <chakra.span
                      fontFamily={"Inter"}
                      fontWeight={"medium"}
                      color={"gray.500"}
                    >
                      {" "}
                      - {data.role}
                    </chakra.span>
                  </chakra.p>
                </Flex>
                <Avatar
                  // src={avatar}
                  height={"80px"}
                  width={"80px"}
                  alignSelf={"center"}
                  m={{ base: "0 0 35px 0", md: "0 0 0 50px" }}
                />
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Reveal>
    </>
  );
};
