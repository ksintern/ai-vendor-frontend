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