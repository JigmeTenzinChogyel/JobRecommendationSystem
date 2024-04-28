import { useNavigate } from "react-router-dom";

const useLogout = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return {
        logout
    }
}

export default useLogout;