
import { Box, Flex, Text, Link, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <footer>
            <Box bg="#0A142F" py={6}>
                <Flex maxW="960px" mx="auto" direction={{base: "column", md: "row"}} textAlign="center" justify="space-between" wrap="wrap" color="white">
                    {/* For Employers */}
                    <Flex direction="column" mb={4}>
                        <Text fontWeight="bold" fontSize={{base: "xs", md: "sm"}} mb={2}>For Employers</Text>
                        <Link fontSize="10px" mb={2}>Post a Job</Link>
                        <Link fontSize="10px" mb={2}>Free Job Search</Link>
                    </Flex>

                    {/* For Job Seekers */}
                    <Flex direction="column" fontSize={{base: "xs", md: "sm"}} mb={4}>
                        <Text fontWeight="bold" mb={2}>For Job Seekers</Text>
                        <Link fontSize="10px" mb={2}>Find Jobs</Link>
                        <Link fontSize="10px" mb={2}>Find Companies</Link>
                    </Flex>

                    {/* About */}
                    <Flex direction="column" mb={4}>
                        <Text fontWeight="bold" fontSize={{base: "xs", md: "sm"}} mb={2}>About Us</Text>
                        <Link fontSize="10px" mb={2}>Company</Link>
                        <Link fontSize="10px" mb={2}>Careers</Link>
                        <Link fontSize="10px" mb={2}>Legal</Link>
                        <Link fontSize="10px" mb={2}>Help</Link>
                    </Flex>
                </Flex>
                {/* New line */}
                <Flex justify="center" mt={-4} align="center">
                    {/* Logo, Copyright, and Social Icons */}
                    <Flex direction="column" align="center" color="white">
                        <Text fontSize={{base: "xs", md: "sm"}} fontWeight="bold" mb={2}>JOBLESS</Text>
                        <Text as="i" fontSize="xs">© 2024 Jobless Inc. All rights reserved.</Text>

                        {/* Social Icons */}
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
                    </Flex>
                </Flex>
            </Box>

        </footer>
    )
}
export default Footer;