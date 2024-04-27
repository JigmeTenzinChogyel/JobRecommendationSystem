import { Navigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";
import { useAuth } from "../providers/AuthProvider";

function Register() {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!isAuthenticated) {
        return <RegisterForm />
    }
    return <Navigate to="/" />
}

export default Register;