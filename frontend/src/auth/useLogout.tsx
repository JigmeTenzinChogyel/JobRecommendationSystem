import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const useLogout = () => {

    const { setisAuthenticated } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setisAuthenticated(false)
        localStorage.clear();
        navigate("/login");
    }
    return {
        logout
    }
}

export default useLogout;