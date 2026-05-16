import { loginApi } from "../api/authApi";


export const loginService = async (loginData) => {

    try {

        const response = await loginApi(loginData);

        return response;

    } catch (error) {

        throw error.response?.data || {
            detail: "Login failed"
        };
    }
};