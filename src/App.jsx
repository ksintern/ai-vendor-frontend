import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";

import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";

import useAuth from "./hooks/useAuth";


const Dashboard = () => {

    const {
        user,
        logout
    } = useAuth();

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold mb-4">
                Welcome {user.full_name}
            </h1>

            <p className="mb-6">
                Login successful
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


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;