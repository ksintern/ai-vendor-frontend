import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import {

    registerService,

    checkUsernameService,

    checkEmailService

} from "../../../services/authService";

import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

import Input from "../../common/Input/Input";

import Button from "../../common/Button/Button";


const RegisterForm = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        username: "",
        full_name: "",
        email: "",
        business_email: "",
        phone_number: "",
        role: "user",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({});

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);


    // --------------------------------
    // FORM VALIDATION STATE
    // --------------------------------

    const isFormValid =

        formData.username.length >= 3 &&

        formData.full_name.length >= 2 &&

        formData.email &&

        (
            formData.role !== "vendor" ||

            (
                formData.business_email &&

                formData.business_email !== formData.email
            )
        ) &&

        formData.password &&

        formData.confirm_password &&

        formData.password === formData.confirm_password &&

        !Object.values(errors).some(Boolean);


    // -----------------------------
    // HANDLE INPUT CHANGE
    // -----------------------------

    const handleChange = async (e) => {

        const { name, value } = e.target;

        let sanitizedValue = value;

        let errorMessage = "";


        // USERNAME VALIDATION

        if (name === "username") {

            sanitizedValue = value.replace(
                /[^a-zA-Z0-9._-]/g,
                ""
            );

            if (sanitizedValue.length < 3) {

                errorMessage =
                    "Username must contain at least 3 characters";
            }

            // REAL-TIME USERNAME CHECK

            else {

                try {

                    const response =
                        await checkUsernameService(
                            sanitizedValue
                        );

                    if (!response.available) {

                        errorMessage =
                            "Username already taken";
                    }

                } catch {

                    errorMessage =
                        "Unable to validate username";
                }
            }
        }


        // FULL NAME VALIDATION

        if (name === "full_name") {

            sanitizedValue = value.replace(
                /[^a-zA-Z\s]/g,
                ""
            );

            if (
                sanitizedValue &&
                sanitizedValue.length < 2
            ) {

                errorMessage =
                    "Full name must contain at least 2 characters";
            }
        }


        // EMAIL VALIDATION

        if (name === "email") {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                value &&
                !emailRegex.test(value)
            ) {

                errorMessage =
                    "Invalid email format";
            }

            else {

                try {

                    const response =
                        await checkEmailService(
                            value
                        );

                    if (!response.available) {

                        errorMessage =
                            "Email already registered";
                    }

                } catch {

                    errorMessage =
                        "Unable to validate email";
                }
            }

            // EMAIL + BUSINESS EMAIL MATCH

            if (
                formData.role === "vendor" &&
                value === formData.business_email
            ) {

                errorMessage =
                    "Personal email and business email cannot be the same";
            }
        }


        // BUSINESS EMAIL VALIDATION

        if (name === "business_email") {

            if (
                value &&
                value === formData.email
            ) {

                errorMessage =
                    "Personal email and business email cannot be the same";
            }
        }


        // PHONE NUMBER VALIDATION

        if (name === "phone_number") {

            sanitizedValue = value
                .replace(/\D/g, "")
                .slice(0, 10);

            if (
                sanitizedValue &&
                sanitizedValue.length < 10
            ) {

                errorMessage =
                    "Phone number must contain 10 digits";
            }
        }


        // PASSWORD VALIDATION

        if (name === "password") {

            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

            if (
                value &&
                !passwordRegex.test(value)
            ) {

                errorMessage =
                    "Password must contain uppercase, lowercase, number, and special character";
            }
        }


        // CONFIRM PASSWORD VALIDATION

        if (name === "confirm_password") {

            if (
                value &&
                value !== formData.password
            ) {

                errorMessage =
                    "Passwords do not match";
            }
        }


        setErrors((prev) => ({

            ...prev,

            [name]: errorMessage,
        }));


        setFormData((prev) => ({

            ...prev,

            [name]: sanitizedValue,
        }));
    };


    // -----------------------------
    // HANDLE SUBMIT
    // -----------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();


        const hasErrors = Object.values(errors)
            .some((error) => error);

        if (hasErrors) {

            return;
        }

        try {

            setLoading(true);

            setMessage("");

            setErrors({});

            const payload = {

                ...formData,

                business_email:

                    formData.role === "vendor"

                        ? formData.business_email

                        : null
            };

            const response = await registerService(
                payload
            );

            setMessage(response.message);

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (error) {

            const backendError =
                error?.response?.data?.detail;

            // USERNAME EXISTS

            if (
                typeof backendError === "string" &&
                backendError.toLowerCase().includes("username")
            ) {

                setErrors((prev) => ({

                    ...prev,

                    username: backendError
                }));

            }

            // EMAIL EXISTS

            else if (
                typeof backendError === "string" &&
                backendError.toLowerCase().includes("email")
            ) {

                setErrors((prev) => ({

                    ...prev,

                    email: backendError
                }));

            }

            // BUSINESS EMAIL ISSUE

            else if (
                typeof backendError === "string" &&
                backendError.toLowerCase().includes("business")
            ) {

                setErrors((prev) => ({

                    ...prev,

                    business_email: backendError
                }));

            }

            else {

                setMessage(

                    backendError ||

                    "Registration failed"
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <AuthLayout
            subtitle="
                Create your enterprise AI vendor intelligence account
            "
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* ROLE SELECTION */}

                <div>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-xl
                            bg-slate-900
                            border
                            border-slate-700
                            px-4
                            py-3
                            text-white
                            focus:outline-none
                            focus:border-cyan-500
                        "
                    >

                        <option value="user">

                            Register as User

                        </option>

                        <option value="vendor">

                            Register as Vendor

                        </option>

                    </select>

                </div>


                {/* USERNAME */}

                <div>

                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    {
                        errors.username && (

                            <p className="mt-2 text-sm text-red-400">

                                {errors.username}

                            </p>
                        )
                    }

                </div>


                {/* FULL NAME */}

                <div>

                    <Input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />

                    {
                        errors.full_name && (

                            <p className="mt-2 text-sm text-red-400">

                                {errors.full_name}

                            </p>
                        )
                    }

                </div>


                {/* EMAIL */}

                <div>

                    <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {
                        errors.email && (

                            <p className="mt-2 text-sm text-red-400">

                                {errors.email}

                            </p>
                        )
                    }

                </div>


                {/* BUSINESS EMAIL */}

                {
                    formData.role === "vendor" && (

                        <div>

                            <Input
                                type="email"
                                name="business_email"
                                placeholder="Business Email Address"
                                value={formData.business_email}
                                onChange={handleChange}
                                required
                            />

                            {
                                errors.business_email && (

                                    <p className="mt-2 text-sm text-red-400">

                                        {errors.business_email}

                                    </p>
                                )
                            }

                        </div>
                    )
                }


                {/* PHONE NUMBER */}

                <div>

                    <Input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />

                    {
                        errors.phone_number && (

                            <p className="mt-2 text-sm text-red-400">

                                {errors.phone_number}

                            </p>
                        )
                    }

                </div>


                {/* PASSWORD */}

                <div>

                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {
                        errors.password && (

                            <p className="mt-2 text-sm text-red-400">

                                {errors.password}

                            </p>
                        )
                    }

                </div>


                {/* CONFIRM PASSWORD */}

                <div>

                    <Input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                    />

                    {
                        errors.confirm_password && (

                            <p className="mt-2 text-sm text-red-400">

                                {errors.confirm_password}

                            </p>
                        )
                    }

                </div>


                {/* API MESSAGE */}

                {
                    message && (

                        <div
                            className={`
                                text-sm
                                rounded-2xl
                                p-4
                                border

                                ${
                                    message.includes("success")

                                        ? `
                                            bg-cyan-500/10
                                            border-cyan-500/20
                                            text-cyan-300
                                          `

                                        : `
                                            bg-red-500/10
                                            border-red-500/20
                                            text-red-300
                                          `
                                }
                            `}
                        >

                            {message}

                        </div>
                    )
                }


                {/* SUBMIT BUTTON */}

                <Button
                    type="submit"
                    disabled={loading || !isFormValid}
                >

                    {
                        loading
                            ? "Creating Workspace..."
                            : "Create Account"
                    }

                </Button>


                {/* LOGIN LINK */}

                <p
                    className="
                        text-sm
                        text-slate-400
                        text-center
                    "
                >

                    Already have an account?
                    {" "}

                    <Link
                        to="/login"

                        className="
                            text-cyan-400
                            hover:text-cyan-300
                            transition-colors
                        "
                    >

                        Access Platform

                    </Link>

                </p>

            </form>

        </AuthLayout>
    );
};

export default RegisterForm;