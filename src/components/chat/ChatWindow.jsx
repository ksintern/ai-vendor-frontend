import {
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";

import {
  sendMessage
} from "../../api/chatApi";

import RecommendationCard from "./RecommendationCard";


const MAX_MESSAGE_LENGTH = 500;


const ChatWindow = () => {

  const [
    messages,
    setMessages
  ] = useState([]);

  const [
    input,
    setInput
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    sessionId,
    setSessionId
  ] = useState(null);

  const [
    error,
    setError
  ] = useState(null);

  const bottomRef = useRef(null);

  const inputRef = useRef(null);


  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [

    messages,

    loading

  ]);


  useEffect(() => {

    inputRef.current?.focus();

  }, []);


  const appendMessage = useCallback(

    (message) => {

      setMessages(

        prev => [

          ...prev,

          message

        ]

      );

    },

    []

  );


  const handleSend = async () => {

    const trimmed = input.trim();

    if (

      !trimmed ||

      loading

    ) {

      return;

    }

    if (

      trimmed.length >

      MAX_MESSAGE_LENGTH

    ) {

      setError(

        `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`

      );

      return;

    }

    setError(null);

    appendMessage({

      role: "user",

      text: trimmed

    });

    setInput("");

    setLoading(true);

    try {

      const result = await sendMessage(

        trimmed,

        sessionId

      );

      if (

        result?.session_id &&

        !sessionId

      ) {

        setSessionId(

          result.session_id

        );

      }

      if (

        result?.success

      ) {

        appendMessage({

          role: "assistant",

          text:

            result.message ||

            "No response received.",

          recommendations:

            result.recommendations ||

            []

        });

      }

      else {

        appendMessage({

          role: "error",

          text:

            result?.error ||

            "AI temporarily unavailable"

        });

      }

    }

    catch (

      err

    ) {

      console.error(

        "Chat API Error:",

        err

      );

      appendMessage({

        role: "error",

        text:

          "Unable to connect. Please try again."

      });

    }

    finally {

      setLoading(false);

      inputRef.current?.focus();

    }

  };


  const handleKeyDown = (

    e

  ) => {

    if (

      e.key === "Enter" &&

      !e.shiftKey

    ) {

      e.preventDefault();

      handleSend();

    }

  };


  return (

    <div

      className="

      flex

      flex-col

      h-full

      bg-white

      border

      rounded-lg

      shadow-sm

      overflow-hidden

      "

    >

      <div

        className="

        flex-1

        overflow-y-auto

        p-4

        space-y-4

        "

      >

        {

          messages.map(

            (

              msg,

              index

            ) => (

              <div

                key={index}

                className="

                flex

                flex-col

                "

              >

                <div

                  className={`

                  max-w-[75%]

                  px-4

                  py-3

                  rounded-xl

                  whitespace-pre-wrap

                  break-words

                  ${

                    msg.role === "user"

                    ?

                    "bg-blue-600 text-white ml-auto"

                    :

                    msg.role === "assistant"

                    ?

                    "bg-gray-100 text-black"

                    :

                    "bg-red-100 text-red-700"

                  }

                  `}

                >

                  {

                    msg.text

                  }

                </div>

                {

                  msg.role === "assistant"

                  &&

                  msg.recommendations?.length > 0

                  && (

                    <div

                      className="

                      mt-3

                      space-y-3

                      "

                    >

                      {

                        msg.recommendations.map(

                          vendor => (

                            <RecommendationCard

                              key={

                                vendor.vendor_id

                              }

                              vendor={

                                vendor

                              }

                            />

                          )

                        )

                      }

                    </div>

                  )

                }

              </div>

            )

          )

        }

        {

          loading && (

            <div

              className="

              bg-gray-100

              px-4

              py-3

              rounded-xl

              text-gray-600

              animate-pulse

              w-fit

              "

            >

              AI is typing...

            </div>

          )

        }

        <div

          ref={bottomRef}

        />

      </div>

      {

        error && (

          <div

            className="

            px-4

            py-2

            text-sm

            text-red-600

            border-t

            bg-red-50

            "

          >

            {error}

          </div>

        )

      }

      <div

        className="

        border-t

        p-3

        flex

        gap-2

        bg-white

        "

      >

        <input

          ref={inputRef}

          value={input}

          maxLength={

            MAX_MESSAGE_LENGTH

          }

          onChange={

            e =>

            setInput(

              e.target.value

            )

          }

          onKeyDown={

            handleKeyDown

          }

          disabled={

            loading

          }

          placeholder="Ask vendor related questions..."

          className="

          flex-1

          border

          rounded-lg

          px-3

          py-2

          outline-none

          focus:ring-2

          focus:ring-blue-500

          disabled:bg-gray-100

          "

        />

        <button

          onClick={

            handleSend

          }

          disabled={

            loading ||

            !input.trim()

          }

          className="

          bg-blue-600

          text-white

          px-5

          py-2

          rounded-lg

          disabled:bg-gray-400

          transition

          "

        >

          {

            loading

            ?

            "Sending..."

            :

            "Send"

          }

        </button>

      </div>

    </div>

  );

};


export default ChatWindow;