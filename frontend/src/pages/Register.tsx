import { Navigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";
import { useAuth } from "../providers/AuthProvider";
import Loading from "./Loading";

function Register() {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return <Loading />
    }
    if (!isAuthenticated) {
        return <RegisterForm />
    }
    return <Navigate to="/" />
}

export default Register;