import { useEffect, useState } from "react";
import { createProvider } from "../utils/CreateProvider";
import { useJobRecommendation } from "../hooks/job";

const useAuthValue = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);

    const { jobs, isLoading, fetchRecommendation, setjobs } = useJobRecommendation(page);

    useEffect(() => {
        fetchRecommendation()
            .then((data) => {
                setjobs(data.results)
                setCount(data.count);
                setNext(data.next);
                setPrevious(data.previous);
            })
    }, [page]);

    return {
        page,
        jobs,
        setPage,
        isLoading,
        count,
        next,
        previous,
    };
};

useAuthValue.__PROVIDER__ = "PaginationContextProvider";

export const { Provider: PaginationProvider, useContext: usePagination } =
    createProvider(useAuthValue);