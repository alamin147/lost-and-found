import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import type { decodedUser } from "../types/types";

export const setUserLocalStorage = (token: string, navigate?: (path: string) => void) => {
  if (typeof window !== "undefined" && window.localStorage) {
    if (token == null || token == undefined) {
      localStorage.removeItem("accessToken");
      if (navigate) {
        navigate("/");
      } else {
        window.location.href = "/";
      }
    } else {
      localStorage.setItem("accessToken", token);
    }
  }
};

export const getUserLocalStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("accessToken");
    return token;
  }
  return null;
};
export const removeUserLocalStorage = (navigate?: (path: string) => void) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("accessToken");
    if (navigate) {
      navigate("/login");
    } else {
      window.location.href = "/login";
    }
  }
};

export const verifyToken = (token: string) => {
  const decodedUser: decodedUser = jwtDecode(token);
  return decodedUser;
};

export const useUserVerification = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = getUserLocalStorage();
    if (token) {
      const verifiedUser = verifyToken(token);
      if (verifiedUser) {
        setUser(verifiedUser);
      }
    }
  }, []);

  return user;
};

export const signOut = (navigate?: (path: string) => void) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("accessToken");
    if (navigate) {
      navigate("/");
    } else {
      window.location.href = "/";
    }
  }
};

// const router = useRouter()
//   const user: any  = useUserVerification();
//   console.log(user.role);
//   if(user?.role=="USER"){
//    removeUserLocalStorage()
//   }
