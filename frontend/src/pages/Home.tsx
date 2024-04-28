import { useAuth } from "../providers/AuthProvider";
import Loading from "./Loading";
import HomeHero from "../components/Hero/HomeHero";

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
        <HomeHero />
    )
}

export default Home;