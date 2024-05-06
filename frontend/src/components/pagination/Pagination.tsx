import { Flex, IconButton, Text } from "@chakra-ui/react";
import { icons } from "../../utils/icons";
import { usePagination } from "../../providers/PaginationProvider";

export const Pagination = () => {
    const { page, setPage, previous, next, count } = usePagination();

    const handlePreviousPage = () => {
        if (previous) {
            setPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (next) {
            setPage((prev) => prev + 1);
        }
    };

    const totalPages = Math.ceil(count / 8);
    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    return (
        <Flex w="100%" justify="center" align="center" gap={4} mt={8}>
            <IconButton
                icon={<icons.arrowToLeft />}
                aria-label="Previous Page"
                variant="ghost"
                isDisabled={isFirstPage}
                onClick={handlePreviousPage}
            />
            <Text 
                fontSize="small"
                textColor="gray.500"
                >
                Page {page} of {totalPages}
            </Text>
            <IconButton
                icon={<icons.arrowToRight />}
                aria-label="Next Page"
                variant="ghost"
                isDisabled={isLastPage}
                onClick={handleNextPage}
            />
        </Flex>
    );
};