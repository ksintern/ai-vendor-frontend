import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginService } from "../../../services/authService";

import useAuth from "../../../hooks/useAuth";


const LoginForm = () => {

    const {
        login
    } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setMessage("");

            const response = await loginService(formData);

            console.log(
                "Backend Response:",
                response
            );

            // Store complete auth object
            login(response);

            // Display backend response
            setMessage(response.message);

            // Redirect to dashboard
            navigate("/dashboard");

        } catch (error) {

            setMessage(
                error.detail || "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 border rounded-lg shadow-lg"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white p-3 rounded"
                >

                    {
                        loading
                            ? "Logging in..."
                            : "Login"
                    }

                </button>

                {
                    message && (

                        <p className="mt-4 text-center">

                            {message}

                        </p>
                    )
                }

            </form>

        </div>
    );
};

export default LoginForm;