import axios from "axios";


const axiosInstance = axios.create({

    baseURL: import.meta.env.VITE_API_BASE_URL,

    withCredentials: true,

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
// ENTERPRISE TOKEN REFRESH
// -----------------------------

axiosInstance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // ACCESS TOKEN EXPIRED

        if (

            error.response?.status === 401 &&

            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                // REQUEST NEW ACCESS TOKEN

                const response = await axios.post(

                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,

                    {},

                    {
                        withCredentials: true,
                    }
                );

                // UPDATE LOCAL STORAGE

                const storedAuth = JSON.parse(

                    localStorage.getItem("auth")
                );

                const updatedAuth = {

                    ...storedAuth,

                    access_token:
                        response.data.access_token,
                };

                localStorage.setItem(

                    "auth",

                    JSON.stringify(updatedAuth)
                );

                // RETRY ORIGINAL REQUEST

                originalRequest.headers.Authorization =

                    `Bearer ${response.data.access_token}`;

                return axiosInstance(
                    originalRequest
                );

            } catch (refreshError) {

                console.warn(
                    "Session expired. Logging out..."
                );

                localStorage.removeItem("auth");

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;