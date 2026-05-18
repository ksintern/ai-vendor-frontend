import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { loginService } from "../../../services/authService";

import useAuth from "../../../hooks/useAuth";

import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

import Input from "../../common/Input/Input";

import Button from "../../common/Button/Button";


const LoginForm = () => {

    const { login } = useAuth();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        identifier: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const [validationError, setValidationError] =
        useState("");

    const [loading, setLoading] = useState(false);


    // -----------------------------
    // HANDLE INPUT CHANGE
    // -----------------------------

    const handleChange = (e) => {

        const { name, value } = e.target;


        // IDENTIFIER SANITIZATION

        if (name === "identifier") {

            setFormData({

                ...formData,

                identifier: value.trimStart(),
            });

            return;
        }


        setFormData({

            ...formData,

            [name]: value,
        });
    };


    // -----------------------------
    // HANDLE SUBMIT
    // -----------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        setValidationError("");

        setMessage("");


        // IDENTIFIER VALIDATION

        if (
            formData.identifier.trim().length < 3
        ) {

            setValidationError(
                "Please enter a valid email or username"
            );

            return;
        }


        // PASSWORD VALIDATION

        if (
            formData.password.length < 8
        ) {

            setValidationError(
                "Password must contain at least 8 characters"
            );

            return;
        }

        try {

            setLoading(true);

            const response = await loginService(
                formData
            );

            login(response);


            // -----------------------------
            // ROLE-BASED REDIRECTION
            // -----------------------------

            const userRole =
                response?.user?.role;


            if (userRole === "admin") {

                navigate("/admin");

            } else if (
                userRole === "vendor"
            ) {

                navigate("/vendor");

            } else {

                navigate("/dashboard");
            }

        } catch (error) {

            const backendError =
                error?.response?.data?.detail;

            if (Array.isArray(backendError)) {

                setMessage(
                    backendError[0]?.msg ||
                    "Login failed"
                );

            } else {

                setMessage(
                    backendError ||
                    "Login failed"
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <AuthLayout
            subtitle="
                Access your AI vendor intelligence workspace
            "
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* IDENTIFIER */}

                <Input
                    type="text"
                    name="identifier"
                    placeholder="Email or Username"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                />


                {/* PASSWORD */}

                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />


                {/* VALIDATION ERROR */}

                {
                    validationError && (

                        <div
                            className="
                                bg-red-500/10
                                border
                                border-red-500/20
                                text-red-300
                                text-sm
                                rounded-2xl
                                p-4
                            "
                        >

                            {validationError}

                        </div>
                    )
                }


                {/* API MESSAGE */}

                {
                    message && (

                        <div
                            className="
                                bg-red-500/10
                                border
                                border-red-500/20
                                text-red-300
                                text-sm
                                rounded-2xl
                                p-4
                            "
                        >

                            {message}

                        </div>
                    )
                }


                {/* SUBMIT BUTTON */}

                <Button
                    type="submit"
                    disabled={loading}
                >

                    {
                        loading
                            ? "Authenticating..."
                            : "Access Platform"
                    }

                </Button>


                {/* REGISTER LINK */}

                <p
                    className="
                        text-sm
                        text-slate-400
                        text-center
                    "
                >

                    Don’t have an account?
                    {" "}

                    <Link
                        to="/register"

                        className="
                            text-cyan-400
                            hover:text-cyan-300
                            transition-colors
                        "
                    >

                        Create Account

                    </Link>

                </p>

            </form>

        </AuthLayout>
    );
};

export default LoginForm;