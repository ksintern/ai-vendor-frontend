import axiosInstance from "./axiosInstance";


export const loginApi = async (loginData) => {

    const response = await axiosInstance.post(
        "/auth/login",
        loginData
    );

    return response.data;
};