import {
  Flex,
} from "@chakra-ui/react";
import { Working } from "../components/home/Working";
import { Stats } from "../components/home/Stats";
import { TestimonialContnet } from "../components/home/TestimonialContent";

function Home() {
  return (
    <>
      <Flex
        gap={12}
        direction="column"
        position="relative"
        w="100%"
        py="2%"
      >
        <Stats />
        <Working />
        <TestimonialContnet/>
      </Flex>
    </>
  );
}

export default Home;