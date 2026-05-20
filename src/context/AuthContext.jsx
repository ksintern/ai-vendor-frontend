import {
    createContext,
    useEffect,
    useState
} from "react";

import axiosInstance, {

    setAccessToken,

    clearAccessToken

} from "../api/axiosInstance";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);


    // -----------------------------
    // RESTORE SESSION
    // -----------------------------

    const restoreSession = async () => {

        try {

            // --------------------------------
            // TRY REFRESH TOKEN
            // --------------------------------

            const refreshResponse =
                await axiosInstance.post(
                    "/auth/refresh"
                );

            const newAccessToken =
                refreshResponse.data.access_token;

            if (!newAccessToken) {

                throw new Error(
                    "No access token returned"
                );
            }

            // --------------------------------
            // STORE ACCESS TOKEN IN MEMORY
            // --------------------------------

            setAccessToken(
                newAccessToken
            );

            setToken(
                newAccessToken
            );

            // --------------------------------
            // FETCH CURRENT USER
            // --------------------------------

            const userResponse =
                await axiosInstance.get(
                    "/auth/me"
                );

            setUser(
                userResponse.data.user
            );

            setIsAuthenticated(true);

        } catch (error) {

            // --------------------------------
            // SILENT FAIL
            // USER IS JUST NOT LOGGED IN
            // --------------------------------

            clearAccessToken();

            setUser(null);

            setToken(null);

            setIsAuthenticated(false);
        }

        finally {

            setLoading(false);
        }
    };


    // -----------------------------
    // INITIALIZE AUTH
    // -----------------------------

    useEffect(() => {

        restoreSession();

    }, []);


    // -----------------------------
    // LOGIN
    // -----------------------------

    const login = (authData) => {

        setAccessToken(
            authData.access_token
        );

        setToken(
            authData.access_token
        );

        setUser(
            authData.user
        );

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

        // --------------------------------
        // CLEAR MEMORY TOKEN
        // --------------------------------

        clearAccessToken();

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