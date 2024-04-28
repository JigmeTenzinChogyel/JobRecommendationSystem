import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import { jwtDecode } from "jwt-decode";

type Props = {
  user: "seeker" | "recruiter" | "public";
  isAuthenticated: boolean;
  isLoading: boolean;
};

function useAuthService(): Props {
  const [user, setUser] = useState<"seeker" | "recruiter" | "public">("public");
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await auth();
        if (isAuthenticated) {
          await me();
        }
        setUser("public");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pathname]);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setisAuthenticated(true);
      } else {
        setisAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      setisAuthenticated(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setisAuthenticated(false);
      return;
    }

    const { exp } = jwtDecode<{ exp: number }>(token);
    const now = Date.now() / 1000;

    if (!exp || exp < now) {
      await refreshToken();
    } else {
      setisAuthenticated(true);
    }
  };

  const me = async () => {
    try {
      const res = await api.get("/api/user/");

      if (res.status === 200) {
        setUser(res.data.user_type);
      } else {
        setUser("public");
      }
    } catch (err) {
      console.error(err);
      setUser("public");
    }
  };

  return { user, isAuthenticated, isLoading };
}

export default useAuthService;