import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";

import RegisterPage from "../pages/Register/RegisterPage";

import DashboardPage from "../pages/Dashboard/DashboardPage";

import ProtectedRoute from "../components/auth/ProtectedRoute/ProtectedRoute";


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

                            <DashboardPage />

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