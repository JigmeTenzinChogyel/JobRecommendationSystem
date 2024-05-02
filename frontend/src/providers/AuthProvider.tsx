import { createProvider } from "../utils/CreateProvider";
import useAuthService from "../hooks/useAuthService";

const useAuthValue = () => {

  const { user, isAuthenticated, isLoading, setisAuthenticated } = useAuthService();

  return {
    user,
    isAuthenticated,
    isLoading,
    setisAuthenticated
  };
};

useAuthValue.__PROVIDER__ = "AuthContextProvider";
export const { Provider: AuthProvider, useContext: useAuth } = createProvider(useAuthValue);