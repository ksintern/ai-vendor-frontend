import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";

import RegisterPage from "../pages/Register/RegisterPage";

import DashboardPage from "../pages/Dashboard/DashboardPage";

import AdminPage from "../pages/Admin/AdminPage";

import VendorPage from "../pages/Vendor/VendorPage";

import VendorDetailsPage from "../pages/VendorDetails/VendorDetailsPage";

import ProtectedRoute from "../components/auth/ProtectedRoute/ProtectedRoute";


const UnauthorizedPage = () => {

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">

            <div className="text-center">

                <h1 className="text-4xl font-bold text-red-500">

                    Access Denied

                </h1>

                <p className="mt-4 text-lg">

                    You are not authorized to access this page.

                </p>

            </div>

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

                {/* USER DASHBOARD */}

                <Route
                    path="/dashboard"
                    element={

                        <ProtectedRoute
                            allowedRoles={[
                                "admin",
                                "vendor",
                                "user"
                            ]}
                        >

                            <DashboardPage />

                        </ProtectedRoute>
                    }
                />

                {/* ADMIN DASHBOARD */}

                <Route
                    path="/admin"
                    element={

                        <ProtectedRoute
                            allowedRoles={["admin"]}
                        >

                            <AdminPage />

                        </ProtectedRoute>
                    }
                />

                {/* VENDOR DASHBOARD */}

                <Route
                    path="/vendor"
                    element={

                        <ProtectedRoute
                            allowedRoles={["vendor"]}
                        >

                            <VendorPage />

                        </ProtectedRoute>
                    }
                />


                {/* VENDOR MARKETPLACE */}

                <Route
                    path="/vendors"
                    element={

                        <ProtectedRoute
                            allowedRoles={[
                                "admin",
                                "vendor",
                                "user"
                            ]}
                        >

                            <VendorDetailsPage />

                        </ProtectedRoute>
                    }
                />


                {/* UNAUTHORIZED */}

                <Route
                    path="/unauthorized"
                    element={<UnauthorizedPage />}
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