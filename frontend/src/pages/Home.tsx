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
        <section>
            <button>Get Started</button>
        </section>
    )
}

export default Home;