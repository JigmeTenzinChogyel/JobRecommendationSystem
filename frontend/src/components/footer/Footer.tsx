
import { Box, Flex, Text, Link, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Reveal } from '../animate/Reveal';

function Footer() {
    return (
        <Box bg="#0A142F" py={6}>
            <Flex textAlign="center" justify="space-evenly" wrap="wrap" color="white">
                {/* For Employers */}
                <Reveal>
                    <Flex direction="column" mb={4}>
                        <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} mb={2}>For Employers</Text>
                        <Link fontSize="10px" mb={2}>Post a Job</Link>
                        <Link fontSize="10px" mb={2}>Free Job Search</Link>
                    </Flex>
                </Reveal>

                {/* For Job Seekers */}
                <Reveal>
                    <Flex direction="column" fontSize={{ base: "xs", md: "sm" }} mb={4}>
                        <Text fontWeight="bold" mb={2}>For Job Seekers</Text>
                        <Link fontSize="10px" mb={2}>Find Jobs</Link>
                        <Link fontSize="10px" mb={2}>Find Companies</Link>
                    </Flex>
                </Reveal>

                {/* About */}
                <Reveal>
                    <Flex direction="column" mb={4}>
                        <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} mb={2}>About Us</Text>
                        <Link fontSize="10px" mb={2}>Company</Link>
                        <Link fontSize="10px" mb={2}>Careers</Link>
                        <Link fontSize="10px" mb={2}>Legal</Link>
                        <Link fontSize="10px" mb={2}>Help</Link>
                    </Flex>
                </Reveal>
            </Flex>
            {/* New line */}
            <Flex justify="center" align="center">
                {/* Logo, Copyright, and Social Icons */}
                <Flex direction="column" align="center" color="white">
                    <Reveal>
                        <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" mb={2}>JOBLESS</Text>
                    </Reveal>
                    <Reveal>
                        <Text as="i" fontSize="xs">© 2024 Jobless Inc. All rights reserved.</Text>
                    </Reveal>
                    {/* Social Icons */}
                    <Reveal>
                        <Flex mt={4} fontSize="12px">
                            <Link mr={2}>
                                <Icon as={FaFacebook} boxSize={5} />
                            </Link>
                            <Link mr={2}>
                                <Icon as={FaTwitter} boxSize={5} />
                            </Link>
                            <Link>
                                <Icon as={FaInstagram} boxSize={5} />
                            </Link>
                        </Flex>
                    </Reveal>
                </Flex>
            </Flex>
        </Box>
    )
}
export default Footer;