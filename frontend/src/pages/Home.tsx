import { Box } from "@chakra-ui/react";
import { useAuth } from "../providers/AuthProvider";
import Loading from "./Loading";

function Home() {
    const {user, isAuthenticated, isLoading} = useAuth()

    if (isLoading) {
        return <Loading />
    }

    if(isAuthenticated) {
        return (
        <section>
            <button>{user === "seeker" ? "Jobs" : "Post Job"}</button>
        </section>
        )
    }

    return (
        <Box minH="100vh">
            <button>Get Started</button>
        </Box>
    )
}

export default Home;