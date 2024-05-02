import { Flex, Text, Input, Select, Button } from "@chakra-ui/react";
import { useState } from "react";

interface FilterProps {
    onFilterChange: (filters: {
        search?: string;
        datePosted?: string;
        salaryRange?: string;
        location?: string;
        jobType?: string;
    }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<{
        search?: string;
        datePosted?: string;
        salaryRange?: string;
        location?: string;
        jobType?: string;
    }>({
        search: "",
        datePosted: "",
        salaryRange: "",
        location: "",
        jobType: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const clearFilters = () => {
        setFilters({
            search: "",
            datePosted: "",
            salaryRange: "",
            location: "",
            jobType: "",
        });
    };

    const applyFilters = () => {
        onFilterChange(filters);
    };

    return (
        <Flex 
            p={4} 
            position='sticky'
            bg="white"
            maxH='40vh'
            top="8.2%"
            zIndex="10"
            gap={5}
            px="2%"
            >
            <Input
                placeholder="Search"
                name="search"
                value={filters.search}
                onChange={handleInputChange}
                mb={2}
            />
            <Input
                type="date"
                placeholder="Date Posted"
                name="datePosted"
                value={filters.datePosted}
                onChange={handleInputChange}
                mb={2}
            />
            <Input
                placeholder="Salary Range"
                name="salaryRange"
                value={filters.salaryRange}
                onChange={handleInputChange}
                mb={2}
            />
            <Input
                placeholder="Location"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                mb={2}
            />
            <Select
                placeholder="Job Type"
                name="jobType"
                value={filters.jobType}
                onChange={handleInputChange}
                mb={2}
            >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
            </Select>
            <Flex justify="space-between" gap={4}>
                <Button colorScheme="teal" variant="outline" onClick={applyFilters}>Apply</Button>
                <Button onClick={clearFilters} variant="outline">Clear</Button>
            </Flex>
        </Flex>
    );
};

export default Filter;
