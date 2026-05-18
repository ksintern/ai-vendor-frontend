import { Navigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";


const ProtectedRoute = ({ children }) => {

    const {
        isAuthenticated,
        loading
    } = useAuth();


    // -----------------------------
    // AUTH VALIDATION LOADING
    // -----------------------------

    if (loading) {

        return (

            <div className="flex items-center justify-center min-h-screen">

                <h1 className="text-2xl font-semibold">

                    Loading...

                </h1>

            </div>
        );
    }


    // -----------------------------
    // UNAUTHENTICATED USER
    // -----------------------------

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    // -----------------------------
    // AUTHENTICATED USER
    // -----------------------------

    return children;
};

export default ProtectedRoute;