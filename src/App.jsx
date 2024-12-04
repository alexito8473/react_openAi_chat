import { useState } from "react";
import "./App.css"
import { Chat } from "./components/Chat/Chat.jsx";
import { Controls } from "./components/Control/Control.jsx";
import { Assistant } from "./assistants/openai";

function App() {
  const assistant = new Assistant();
  const [isLoadMessage, setIsLoadMessage] = useState(false)
  const [messages, setMessages] = useState([]);

  function updateLastMessageContent(content) {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  }

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }
  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoadMessage(true);
    try {
      const result = await assistant.chatStream(content, messages);
      let isFirstChunk = false;
      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoadMessage(false);
        }
        updateLastMessageContent(chunk);
      }
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
      setIsLoadMessage(false);
    }
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
