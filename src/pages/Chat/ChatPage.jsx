import ChatWindow from "../../components/chat/ChatWindow";


const ChatPage = () => {

return(

<div

className="h-[calc(100vh-80px)] p-6"

>

<div

className="max-w-5xl mx-auto h-full"

>

<h1

className="text-2xl font-semibold mb-4"

>

AI Vendor Assistant

</h1>

<ChatWindow/>

</div>

</div>

);

};


export default ChatPage;