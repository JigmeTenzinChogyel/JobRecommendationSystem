import { Flex, Spinner, Text } from "@chakra-ui/react";

function Loading({ text = "Loading..." }) {
  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bg="gray.100"
      flexDirection="column"
    >
      <Spinner size="xl" color="blue.500" mb={4} />
      <Text fontWeight="semibold" color="gray.600">
        {text}
      </Text>
    </Flex>
  );
}

export default Loading;