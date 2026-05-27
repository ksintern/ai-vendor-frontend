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


const MAX_MESSAGE_LENGTH=500;

const STORAGE_KEY="vendor_chat_session";

const WELCOME_MESSAGE={

role:"assistant",

text:

"Hello 👋 Tell me your event requirements and I'll help find vendors.",

recommendations:[]

};


const ChatWindow=()=>{

const [

messages,
setMessages

]=useState(

[WELCOME_MESSAGE]

);

const [

input,
setInput

]=useState("");

const [

loading,
setLoading

]=useState(false);

const [

sessionId,
setSessionId

]=useState(

localStorage.getItem(

STORAGE_KEY

)

||

null

);

const [

error,
setError

]=useState(null);

const bottomRef=useRef(null);

const inputRef=useRef(null);

const sendingRef=useRef(false);


useEffect(

()=>{

bottomRef.current?.scrollIntoView({

behavior:"smooth"

});

},

[

messages,
loading

]

);


useEffect(

()=>{

inputRef.current?.focus();

},

[]

);


useEffect(

()=>{

if(

sessionId

){

localStorage.setItem(

STORAGE_KEY,

sessionId

);

}

},

[

sessionId

]

);


const appendMessage=useCallback(

(

message

)=>{

setMessages(

prev=>[

...prev,

message

]

);

},

[]

);


const handleSend=async()=>{

const trimmed=input.trim();

if(

!trimmed

||

loading

||

sendingRef.current

){

return;

}

if(

trimmed.length>

MAX_MESSAGE_LENGTH

){

setError(

`Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`

);

return;

}

sendingRef.current=true;

setError(null);

appendMessage({

role:"user",

text:trimmed

});

setInput("");

setLoading(true);

try{

const result=

await sendMessage(

trimmed,

sessionId

);

if(

result?.session_id

&&

result.session_id!==sessionId

){

setSessionId(

result.session_id

);

}

if(

result?.success

){

appendMessage({

role:"assistant",

text:

result.message

||

"No response received.",

recommendations:

result.recommendations

||

[]

});

}

else{

appendMessage({

role:"error",

text:

result?.error

||

"Unable to process request."

});

}

}

catch(

err

){

console.error(

err

);

appendMessage({

role:"error",

text:

"Unable to connect. Please try again."

});

}

finally{

sendingRef.current=false;

setLoading(false);

inputRef.current?.focus();

}

};


const handleKeyDown=(

e

)=>{

if(

e.key==="Enter"

&&

!e.shiftKey

){

e.preventDefault();

handleSend();

}

};


return(

<div

className="

flex
flex-col
h-full
bg-white
border
rounded-xl
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
bg-gray-50

"

>

{

messages.map(

(

msg,
index

)=>(

<div

key={index}

className="

flex
flex-col

"

>

<div

className={`

max-w-[80%]
px-4
py-3
rounded-2xl
whitespace-pre-wrap
break-words

${

msg.role==="user"

?

"bg-blue-600 text-white ml-auto"

:

msg.role==="assistant"

?

"bg-white border text-gray-900"

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

msg.role==="assistant"

&&

msg.recommendations?.length>0

&&(

<div

className="

mt-3
space-y-3

"

>

{

msg.recommendations.map(

vendor=>(

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

loading

&&(

<div

className="

bg-white
border
px-4
py-3
rounded-2xl
w-fit
text-gray-500

"

>

<div

className="

flex
gap-1

"

>

<div

className="

w-2
h-2
rounded-full
bg-gray-400
animate-bounce

"

/>

<div

className="

w-2
h-2
rounded-full
bg-gray-400
animate-bounce

"

style={{

animationDelay:"0.15s"

}}

/>

<div

className="

w-2
h-2
rounded-full
bg-gray-400
animate-bounce

"

style={{

animationDelay:"0.3s"

}}

/>

</div>

</div>

)

}

<div

ref={bottomRef}

/>

</div>


{

error

&&(

<div

className="

px-4
py-2
text-sm
text-red-600
bg-red-50
border-t

"

>

{

error

}

</div>

)

}


<div

className="

border-t
bg-white
p-3
flex
gap-2

"

>

<textarea

ref={inputRef}

value={input}

maxLength={

MAX_MESSAGE_LENGTH

}

rows={1}

onChange={

e=>

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

placeholder="Describe your event requirements..."

className="

flex-1
border
rounded-xl
px-4
py-3
resize-none
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

loading

||

!input.trim()

}

className="

bg-blue-600
text-white
px-5
rounded-xl
disabled:bg-gray-400
transition

"

>

{

loading

?

"..."

:

"Send"

}

</button>

</div>

</div>

);

};


export default ChatWindow;