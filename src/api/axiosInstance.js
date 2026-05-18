import axios from "axios";


const axiosInstance = axios.create({

    baseURL: import.meta.env.VITE_API_BASE_URL,

    headers: {

        "Content-Type": "application/json",
    },
});


// -----------------------------
// REQUEST INTERCEPTOR
// -----------------------------

axiosInstance.interceptors.request.use(

    (config) => {

        try {

            const storedAuth =
                localStorage.getItem("auth");

            if (storedAuth) {

                const parsedAuth =
                    JSON.parse(storedAuth);

                const token =
                    parsedAuth?.access_token;

                if (token) {

                    config.headers.Authorization =
                        `Bearer ${token}`;
                }
            }

        } catch (error) {

            console.error(
                "Token parsing failed:",
                error
            );
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);


// -----------------------------
// RESPONSE INTERCEPTOR
// -----------------------------

axiosInstance.interceptors.response.use(

    (response) => response,

    (error) => {

        const status =
            error.response?.status;

        // TOKEN EXPIRED / INVALID

        if (status === 401) {

            console.warn(
                "Session expired. Logging out..."
            );

            localStorage.removeItem("auth");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;