import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";


export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>

     <form className="w-full flex" onSubmit={(event) => sendChat(event)}>
      <InputEmoji
        value={msg}
        cleanOnEnter
        onChange={setMsg}
        placeholder="Type a message"
        />
        <div className="flex justify-center items-center">
          <button type="submit" className="w-12 h-8 flex justify-center items-center border border-white rounded-3xl">
              <IoMdSend />
          </button>
        </div>
     </form>
    </>
  );
}

