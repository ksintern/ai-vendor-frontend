import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { registerService } from "../../../services/authService";


const RegisterForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
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

            const response = await registerService(
                formData
            );

            setMessage(
                response.message
            );

            // Redirect to login after success
            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (error) {

            setMessage(
                error.detail || "Registration failed"
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
                    Register
                </h2>

                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4"
                    required
                />

                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4"
                    required
                />

                <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={formData.confirm_password}
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
                            ? "Registering..."
                            : "Register"
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

export default RegisterForm;