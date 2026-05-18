import { Navigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";


const ProtectedRoute = ({

    children,

    allowedRoles = []
}) => {

    const {

        isAuthenticated,

        loading,

        role

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
    // ROLE AUTHORIZATION CHECK
    // -----------------------------

    if (

        allowedRoles.length > 0 &&

        !allowedRoles.includes(role)
    ) {

        return (

            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }


    // -----------------------------
    // AUTHORIZED USER
    // -----------------------------

    return children;
};

export default ProtectedRoute;