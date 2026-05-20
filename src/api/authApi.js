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


// -----------------------------
// CHECK USERNAME API
// -----------------------------

export const checkUsernameApi = async (
    username
) => {

    const response = await axiosInstance.get(

        `/auth/check-username/${username}`
    );

    return response.data;
};


// -----------------------------
// CHECK EMAIL API
// -----------------------------

export const checkEmailApi = async (
    email
) => {

    const response = await axiosInstance.get(

        `/auth/check-email/${email}`
    );

    return response.data;
};