import {

    loginApi,

    registerApi,

    checkUsernameApi,

    checkEmailApi

} from "../api/authApi";


// -----------------------------
// LOGIN SERVICE
// -----------------------------

export const loginService = async (
    loginData
) => {

    try {

        return await loginApi(
            loginData
        );

    } catch (error) {

        throw error.response?.data || {

            detail: "Login failed"
        };
    }
};


// -----------------------------
// REGISTER SERVICE
// -----------------------------

export const registerService = async (
    registerData
) => {

    try {

        return await registerApi(
            registerData
        );

    } catch (error) {

        throw error.response?.data || {

            detail: "Registration failed"
        };
    }
};


// -----------------------------
// CHECK USERNAME SERVICE
// -----------------------------

export const checkUsernameService = async (
    username
) => {

    try {

        return await checkUsernameApi(
            username
        );

    } catch (error) {

        throw error.response?.data || {

            detail: "Username validation failed"
        };
    }
};


// -----------------------------
// CHECK EMAIL SERVICE
// -----------------------------

export const checkEmailService = async (
    email
) => {

    try {

        return await checkEmailApi(
            email
        );

    } catch (error) {

        throw error.response?.data || {

            detail: "Email validation failed"
        };
    }
};