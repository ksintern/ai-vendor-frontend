import axios from "axios";


// ====================================
// ACCESS TOKEN MEMORY
// ====================================

let accessToken = null;


// ====================================
// REFRESH STATE
// ====================================

let isRefreshing = false;

let failedQueue = [];


// ====================================
// PROCESS QUEUE
// ====================================

const processQueue = (

error,
token = null

)=>{

failedQueue.forEach(

promise=>{

if(error){

promise.reject(error);

}

else{

promise.resolve(token);

}

}

);

failedQueue=[];

};


// ====================================
// TOKEN HELPERS
// ====================================

export const setAccessToken=(

token

)=>{

accessToken=token;

};


export const clearAccessToken=()=>{

accessToken=null;

};


// ====================================
// AXIOS INSTANCE
// ====================================

const axiosInstance=

axios.create({

baseURL:

import.meta.env

.VITE_API_BASE_URL,

withCredentials:true,

timeout:15000

});


// ====================================
// REQUEST INTERCEPTOR
// ====================================

axiosInstance.interceptors.request.use(

config=>{

if(accessToken){

config.headers.Authorization=

`Bearer ${accessToken}`;

}

return config;

},

error=>Promise.reject(error)

);


// ====================================
// RESPONSE INTERCEPTOR
// ====================================

axiosInstance.interceptors.response.use(

response=>response,

async error=>{

const originalRequest=

error.config;


// NETWORK

if(

!error.response

){

return Promise.reject(

"Network error. Please check your internet connection."

);

}


const status=

error.response.status;


// LOGIN FAILURE

if(

originalRequest?.url?.includes(

"/auth/login"

)

){

return Promise.reject(error);

}


// REFRESH FAILED

if(

originalRequest?.url?.includes(

"/auth/refresh"

)

){

clearAccessToken();

return Promise.reject(

"Session expired"

);

}


// HANDLE 401

if(

status===401

&&

!originalRequest._retry

){

if(

isRefreshing

){

return new Promise(

(

resolve,
reject

)=>{

failedQueue.push({

resolve,
reject

});

}

)

.then(

token=>{

originalRequest.headers.Authorization=

`Bearer ${token}`;

return axiosInstance(

originalRequest

);

}

);

}


originalRequest._retry=true;

isRefreshing=true;


try{

const refresh=

await axios.post(

`${

import.meta.env

.VITE_API_BASE_URL

}/auth/refresh`,

{},

{

withCredentials:true

}

);


const newToken=

refresh.data?.data?.access_token||

refresh.data?.access_token;


if(

!newToken

){

throw Error();

}


setAccessToken(

newToken

);


processQueue(

null,

newToken

);


originalRequest.headers.Authorization=

`Bearer ${newToken}`;


return axiosInstance(

originalRequest

);

}

catch(refreshError){

processQueue(

refreshError,

null

);

clearAccessToken();

return Promise.reject(

"Session expired"

);

}

finally{

isRefreshing=false;

}

}


const apiMessage=

error.response?.data?.message||

error.response?.data?.detail||

error.response?.data?.error?.details?.[0]?.message||

"Something went wrong";


return Promise.reject(

apiMessage

);

}

);


export default axiosInstance;