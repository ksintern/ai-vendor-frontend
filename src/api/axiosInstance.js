import axios from "axios";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

    headers: {
        "Content-Type": "application/json",
    },
});


// -----------------------------
// JWT AUTH INTERCEPTOR
// -----------------------------

axiosInstance.interceptors.request.use(

    (config) => {

        const storedAuth = localStorage.getItem("auth");

        if (storedAuth) {

            const parsedAuth = JSON.parse(storedAuth);

            const token = parsedAuth.access_token;

            if (token) {

                config.headers.Authorization =
                    `Bearer ${token}`;
            }
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);


export default axiosInstance;