import axiosInstance from "./axiosInstance";

export const testBackendConnection = async () => {
  const response = await axiosInstance.get("/");
  return response.data;
};