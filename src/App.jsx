import { useState } from "react";
import "./App.css"
import { Chat } from "./components/Chat/Chat.jsx";
import { Controls } from "./components/Control/Control.jsx";
import { Assistant } from "./assistants/openai";

function App() {
  const assistant = new Assistant();
  const [isLoadMessage, setIsLoadMessage] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hola muy buenas soy el mejor asistente,¿En que puedo ayudarte?'
    }
  ]);

  function addMessage(newContent, typeRole) {
    setMessages((prevMessages) => [...prevMessages, { content: newContent, role: typeRole }]);
  }
  async function handleContentSend(content) {
    addMessage(content, "user");
    setIsLoadMessage(true)
    try {
      const result = await assistant.chat(content, messages);
      addMessage(result, "assistant");
    } catch (error) {
      addMessage(
        "Sorry, I couldn't process your request. Please try again!",
        "system",
      );
    }
    setIsLoadMessage(false)
  }
  return (
    <>
      <header>
        <div className="centerHeader">
          <div className="logo"><img src="/chatbot.png" /></div>
          <p>Chat bot</p>

        </div>
      </header>
      {<Controls isDisabled={isLoadMessage} handleUpdateMessages={handleContentSend} />}
      <div className="chatBot">
        <Chat isLoadMessage={isLoadMessage} messages={messages} />
      </div>
    </>
  )
}


export default App
