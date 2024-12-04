import style from "./Chat.module.css";
import Markdown from "react-markdown";
import { Loader } from "../Loader/Loader.jsx"
import { useRef, useEffect } from "react";
export function Chat({ isLoadMessage, messages }) {
    const messagesEndRef = useRef(null);
    useEffect(
        () => {
            messagesEndRef.current?.scrollIntoView({ bahavior: "smooth" })
        }
        , [messages]
    );
    return (
        <div className={style.Chat}>
            {isLoadMessage && <Loader />}
            {messages.map(
                ({ role, content }, index) =>
                (<div key={index} className={style.Message} data-role={role}>
                    <Markdown>{content}</Markdown>
                </div>)
            )}
            <div ref={messagesEndRef}></div>
        </div>
    );
}