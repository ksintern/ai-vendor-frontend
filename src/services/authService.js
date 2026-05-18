import {
    loginApi,
    registerApi
} from "../api/authApi";


// -----------------------------
// LOGIN SERVICE
// -----------------------------

export const loginService = async (
    loginData
) => {

    try {

        const response = await loginApi(
            loginData
        );

        return response;

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

        const response = await registerApi(
            registerData
        );

        return response;

    } catch (error) {

        throw error.response?.data || {
            detail: "Registration failed"
        };
    }
};