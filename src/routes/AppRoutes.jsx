import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";

import RegisterPage from "../pages/Register/RegisterPage";

import ProtectedRoute from "../components/auth/ProtectedRoute/ProtectedRoute";

import useAuth from "../hooks/useAuth";


const Dashboard = () => {

    const {
        user,
        logout
    } = useAuth();

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold mb-4">

                Welcome {user?.full_name}

            </h1>

            <p className="mb-6">

                JWT Authentication Successful

            </p>

            <button
                onClick={logout}
                className="bg-black text-white px-6 py-3 rounded"
            >

                Logout

            </button>

        </div>
    );
};


const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                {/* REGISTER */}

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                {/* DASHBOARD */}

                <Route
                    path="/dashboard"
                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>
                    }
                />

                {/* DEFAULT REDIRECT */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
};

export default AppRoutes;