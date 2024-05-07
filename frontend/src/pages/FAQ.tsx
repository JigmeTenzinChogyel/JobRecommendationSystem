import {
  AccordionItem,
  AccordionButton,
  Accordion,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Text,
} from "@chakra-ui/react";

function FAQComponent() {
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
      <Text textAlign="center" fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }} fontWeight="bold">
        Frequently Asked Questions (FAQs)
      </Text>
      <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "teal.400", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  Q. How do I create an account?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              To create an account on Jobless, you need to go to the “Register”
              page, enter your email address, a password and select user Role in
              the “Register” form .
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "teal.400", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  Q. How can I edit my profile?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              To edit your profile, you must be logged in first before you can
              access your account details. Then navigate to “Profile”, this will
              allow you to edit your details.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "teal.400", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  Q. How do I upload my resume?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Navigate to 'Jobs' and click on 'Upload Resume'. Select our resume
              file and upload. *To upload your resume you must have selected
              'Jobs' while registering.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "teal.400", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  Q. How do I post Jobs?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Navigate to "Jobs". Click on 'Add' button and fill in your company
              details. After the page refreshes then click on 'Post Job' button,
              fill in the required information and click 'Submit Job'
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "teal.400", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  Q. How does the job matching algorithm work?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              1. Extraction: We extract skills, experience, and qualifications
              from both the user's CV and the job description using our NER
              model.
              <br />
              2. Vectorization: The extracted data is converted into numerical
              vectors using word embedding techniques.
              <br />
              3. Similarity Calculation: We calculate the similarity between the
              job description vector and the user CV vector using cosine
              similarity, determining the match between the user's
              qualifications and the job requirements.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
    </Flex>
  );
}

export default FAQComponent;
