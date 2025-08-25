import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    // setup axios interceptor
    const interceptor = axios.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }

        } catch (error) {
          if (error.message?.includes("auth") || error.message?.includes("token")) {
            toast.error("Authentication issue. Please refresh the page.");
          }
          console.error("Error getting token:", error);
        }
        return config;
      },
      (error) => {
        console.error("Error in request interceptor:", error);
        return Promise.reject(error);
      }
    );
    // cleanup interceptor on unmount
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [getToken]);


  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}
