import { Navigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../providers/AuthProvider";
import Loading from "./Loading";

function Login() {

    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return <Loading />
    }
    if (!isAuthenticated) {
        return <LoginForm />
    }
    return <Navigate to="/" />
}

export default Login;