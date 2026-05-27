import axiosInstance from "./axiosInstance";


const REQUEST_TIMEOUT = 35000;

const MAX_RETRIES = 1;


const sleep = (

    ms

) =>

new Promise(

    resolve =>

    setTimeout(

        resolve,

        ms

    )

);


const normalizeError = (

    error

) => {

    if (

        error?.response

    ) {

        return {

            success:false,

            message:"",

            recommendations:[],

            error:

            error.response

            .data?.error

            ||

            error.response

            .data?.detail

            ||

            "Backend error"

        };

    }

    if (

        error?.code

        ===

        "ECONNABORTED"

    ) {

        return {

            success:false,

            message:"",

            recommendations:[],

            error:

            "Request timeout. Please try again."

        };

    }

    if (

        error?.name

        ===

        "CanceledError"

    ) {

        return {

            success:false,

            message:"",

            recommendations:[],

            error:

            "Request cancelled"

        };

    }

    return {

        success:false,

        message:"",

        recommendations:[],

        error:

        "Network error. Please check your internet connection."

    };

};


const validateResponse = (

    data

) => {

    return {

        success:

        Boolean(

            data?.success

        ),

        message:

        data?.message

        ||

        "",

        session_id:

        data?.session_id

        ||

        null,

        recommendations:

        Array.isArray(

            data?.recommendations

        )

        ?

        data.recommendations

        :

        [],

        error:

        data?.error

        ||

        null

    };

};


export const sendMessage = async (

    message,

    sessionId,

    retry = 0

) => {

    const controller =

    new AbortController();

    try {

        const response = await (

            axiosInstance.post(

                "/chat/message",

                {

                    message,

                    session_id:

                    sessionId

                },

                {

                    timeout:

                    REQUEST_TIMEOUT,

                    signal:

                    controller.signal

                }

            )

        );

        return validateResponse(

            response.data

        );

    }

    catch (

        error

    ) {

        console.error(

            "Chat API Error:",

            error

        );

        const shouldRetry = (

            retry

            <

            MAX_RETRIES

            &&

            !error.response

            &&

            error.code

            !==

            "ECONNABORTED"

        );

        if (

            shouldRetry

        ) {

            await sleep(

                500

            );

            return sendMessage(

                message,

                sessionId,

                retry+1

            );

        }

        return normalizeError(

            error

        );

    }

};