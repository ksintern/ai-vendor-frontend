import axiosInstance from "./axiosInstance";


// -----------------------------
// LOGIN API
// -----------------------------

export const loginApi = async (
    loginData
) => {

    const response = await axiosInstance.post(
        "/auth/login",
        loginData
    );

    return response.data;
};


// -----------------------------
// REGISTER API
// -----------------------------

export const registerApi = async (
    registerData
) => {

    const response = await axiosInstance.post(
        "/auth/register",
        registerData
    );

    return response.data;
};