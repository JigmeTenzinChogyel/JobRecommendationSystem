import { Navigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../providers/AuthProvider";

function Login() {

    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!isAuthenticated) {
        return <LoginForm />
    }
    return <Navigate to="/" />
}

export default Login;