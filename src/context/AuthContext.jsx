import {
    createContext,
    useEffect,
    useState
} from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const storedAuth = localStorage.getItem("auth");

        if (storedAuth) {

            const parsedAuth = JSON.parse(storedAuth);

            setUser(parsedAuth.user);

            setToken(parsedAuth.access_token);

            setIsAuthenticated(true);
        }

    }, []);

    const login = (authData) => {

        localStorage.setItem(
            "auth",
            JSON.stringify(authData)
        );

        setUser(authData.user);

        setToken(authData.access_token);

        setIsAuthenticated(true);
    };

    const logout = () => {

        localStorage.removeItem("auth");

        setUser(null);

        setToken(null);

        setIsAuthenticated(false);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};