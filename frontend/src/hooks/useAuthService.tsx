import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constants";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import { MeResponse } from "./user/type";
import { ME_URL, REFRESH_URL } from "../constants/url";

type Props = {
  user: MeResponse | undefined
  isAuthenticated: boolean;
  isLoading: boolean;
  setisAuthenticated: (value: boolean) => void;
};

function useAuthService(): Props {
  const [user, setUser] = useState<MeResponse>();
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await auth();
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
      const res = await api.post(REFRESH_URL, {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setisAuthenticated(true);
        await me();
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
      await me();
    }
  };

  const me = async () => {
    try {
      const res = await api.get(ME_URL);

      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { user, isAuthenticated, setisAuthenticated, isLoading };
}

export default useAuthService;