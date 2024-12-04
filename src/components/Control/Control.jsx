import {  useState } from "react";
import TexareaAutosize from "react-textarea-autosize"
import style from "./Control.module.css"
    
export function Controls({isDisabled,handleUpdateMessages}){
    const[content,setContent] = useState("")
    const handleContentChange = (value)=>{
        setContent(value.target.value)
    }
    const handleContentSend=()=> {
        if (content.length > 0) {
            handleUpdateMessages(content);
            setContent("");
        }
      }
    return(
        <div className={style.Controls}>
            <div className={style.TextAreaContainer}>
                <TexareaAutosize className={style.TextArea}
                onChange={handleContentChange}
                value={content}
                minRows={1}
                maxRows={4}
                disabled={isDisabled}
                 placeholder="Mensaje" />
            </div>
            <button disabled={isDisabled}  onClick={()=> handleContentSend(content)} className={style.Button}>{<SendIcon />}</button>
        </div>
    );
}
function SendIcon(){
    return (<img src="send.svg"/>)
}