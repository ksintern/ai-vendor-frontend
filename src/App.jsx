import { useEffect, useState } from "react";
import { testBackendConnection } from "./api/chatApi";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const data = await testBackendConnection();
        setMessage(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">
        {message}
      </h1>
    </div>
  );
}

export default App;