import axios from "axios";


// ------------------------------------
// ACCESS TOKEN IN MEMORY
// ------------------------------------

let accessToken = null;


// ------------------------------------
// REFRESH STATE
// ------------------------------------

let isRefreshing = false;

let failedQueue = [];


// ------------------------------------
// PROCESS QUEUE
// ------------------------------------

const processQueue = (
    error,
    token = null
) => {

    failedQueue.forEach((promise) => {

        if (error) {

            promise.reject(error);

        } else {

            promise.resolve(token);
        }
    });

    failedQueue = [];
};


// ------------------------------------
// SET ACCESS TOKEN
// ------------------------------------

export const setAccessToken = (token) => {

    accessToken = token;
};


// ------------------------------------
// CLEAR ACCESS TOKEN
// ------------------------------------

export const clearAccessToken = () => {

    accessToken = null;
};


// ------------------------------------
// AXIOS INSTANCE
// ------------------------------------

const axiosInstance = axios.create({

    baseURL: import.meta.env.VITE_API_BASE_URL,

    withCredentials: true
});


// ------------------------------------
// REQUEST INTERCEPTOR
// ------------------------------------

axiosInstance.interceptors.request.use(

    (config) => {

        if (accessToken) {

            config.headers.Authorization =

                `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);


// ------------------------------------
// RESPONSE INTERCEPTOR
// ------------------------------------

axiosInstance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // ------------------------------------
        // PREVENT REFRESH LOOP
        // ------------------------------------

        if (

            originalRequest?.url?.includes(
                "/auth/refresh"
            )
        ) {

            return Promise.reject(error);
        }

        // ------------------------------------
        // HANDLE 401
        // ------------------------------------

        if (

            error.response?.status === 401 &&

            !originalRequest._retry
        ) {

            // ------------------------------------
            // ALREADY REFRESHING
            // ------------------------------------

            if (isRefreshing) {

                return new Promise(

                    (resolve, reject) => {

                        failedQueue.push({

                            resolve,

                            reject
                        });
                    }

                ).then((token) => {

                    originalRequest.headers.Authorization =

                        `Bearer ${token}`;

                    return axiosInstance(
                        originalRequest
                    );
                });
            }

            originalRequest._retry = true;

            isRefreshing = true;

            try {

                // ------------------------------------
                // REQUEST NEW ACCESS TOKEN
                // ------------------------------------

                const response = await axios.post(

                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,

                    {},

                    {
                        withCredentials: true,
                    }
                );

                const newAccessToken =
                    response.data.access_token;

                // ------------------------------------
                // STORE IN MEMORY
                // ------------------------------------

                accessToken = newAccessToken;

                processQueue(
                    null,
                    newAccessToken
                );

                // ------------------------------------
                // RETRY ORIGINAL REQUEST
                // ------------------------------------

                originalRequest.headers.Authorization =

                    `Bearer ${newAccessToken}`;

                return axiosInstance(
                    originalRequest
                );

            } catch (refreshError) {

                processQueue(
                    refreshError,
                    null
                );

                accessToken = null;

                window.location.href = "/login";

                return Promise.reject(
                    refreshError
                );

            } finally {

                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;