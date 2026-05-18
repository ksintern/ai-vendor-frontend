import {
    createContext,
    useEffect,
    useState
} from "react";

import axiosInstance from "../api/axiosInstance";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);


    // -----------------------------
    // VALIDATE USER SESSION
    // -----------------------------

    const fetchAuthenticatedUser = async () => {

        try {

            const response = await axiosInstance.get(
                "/auth/me"
            );

            setUser(response.data.user);

            setIsAuthenticated(true);

        } catch (error) {

            console.error(
                "Authentication validation failed",
                error
            );

            logout();

        } finally {

            setLoading(false);
        }
    };


    // -----------------------------
    // RESTORE SESSION
    // -----------------------------

    useEffect(() => {

        const storedAuth =
            localStorage.getItem("auth");

        if (storedAuth) {

            const parsedAuth =
                JSON.parse(storedAuth);

            setToken(
                parsedAuth.access_token
            );

            fetchAuthenticatedUser();

        } else {

            setLoading(false);
        }

    }, []);


    // -----------------------------
    // LOGIN
    // -----------------------------

    const login = (authData) => {

        localStorage.setItem(

            "auth",

            JSON.stringify(authData)
        );

        setToken(authData.access_token);

        setUser(authData.user);

        setIsAuthenticated(true);
    };


    // -----------------------------
    // LOGOUT
    // -----------------------------

    const logout = async () => {

        try {

            await axiosInstance.post(
                "/auth/logout"
            );

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );
        }

        localStorage.removeItem("auth");

        setUser(null);

        setToken(null);

        setIsAuthenticated(false);
    };


    return (

        <AuthContext.Provider
            value={{

                user,

                role: user?.role,

                token,

                loading,

                isAuthenticated,

                login,

                logout,
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};