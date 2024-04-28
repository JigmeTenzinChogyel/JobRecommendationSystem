import { createProvider } from "../utils/CreateProvider";
import useAuthService from "../hooks/useAuthService";

const useAuthValue = () => {

  const { user, isAuthenticated, isLoading } = useAuthService();

  return {
    user,
    isAuthenticated,
    isLoading
  };
};

useAuthValue.__PROVIDER__ = "AuthContextProvider";
export const { Provider: AuthProvider, useContext: useAuth } = createProvider(useAuthValue);