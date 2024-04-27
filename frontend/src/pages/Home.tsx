import { useAuth } from "../providers/AuthProvider";

function Home() {
    const {user, isAuthenticated, isLoading} = useAuth()

    return (
        <div>Home</div>
    )
}

export default Home;