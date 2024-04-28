
import { Box, Flex, Text, Link, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <footer>
            <Box bg="#0A142F" py={6}>
                <Flex maxW="960px" mx="auto" justify="space-between" wrap="wrap" color="white">
                    {/* For Employers */}
                    <Flex direction="column" mb={4}>
                        <Text fontWeight="bold" fontSize="20" mb={2}>For Employers</Text>
                        <Link fontSize="12" mb={2}>Post a Job</Link>
                        <Link fontSize="12" mb={2}>Free Job Search</Link>
                    </Flex>

                    {/* For Job Seekers */}
                    <Flex direction="column" fontSize="20" mb={4}>
                        <Text fontWeight="bold" mb={2}>For Job Seekers</Text>
                        <Link fontSize="12" mb={2}>Find Jobs</Link>
                        <Link fontSize="12" mb={2}>Find Companies</Link>
                    </Flex>

                    {/* About */}
                    <Flex direction="column" mb={4}>
                        <Text fontWeight="bold" fontSize="20" mb={2}>About</Text>
                        <Link fontSize="12" mb={2}>Company</Link>
                        <Link fontSize="12" mb={2}>Careers</Link>
                        <Link fontSize="12" mb={2}>Legal</Link>
                        <Link fontSize="12" mb={2}>Help</Link>
                    </Flex>
                </Flex>
                {/* New line */}
                <Flex justify="center" mt={-4} align="center">
                    {/* Logo, Copyright, and Social Icons */}
                    <Flex direction="column" align="center" color="white">
                        <Text fontSize="3xl" fontWeight="bold" mb={2}>JOBLESS</Text>
                        <Text fontSize="sm">© 2024 Jobless Inc. All rights reserved.</Text>

                        {/* Social Icons */}
                        <Flex mt={4}>
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