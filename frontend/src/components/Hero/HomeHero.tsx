import { Flex } from "@chakra-ui/react";
import Job from "../job/Job";
import Hero from "./Hero";
import Filter from "../filter/Filter";

function HomeHero() {

    const IMAGE_URL = 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9vbHN8ZW58MHwwfDB8fHww'

    return (
        <>
            <Hero
                imageUrl={IMAGE_URL}
                heading="Find Your Dream Job"
                subHeading="Unlock your career potential with our advanced job matching algorithm"
            />
            <Flex px='5%' py='2%' direction={{base: "column", md: "row"}}  >
                <Filter />
                <Job />
            </Flex>
        </>
    );
}

export default HomeHero;