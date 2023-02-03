import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { recieveMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import ChatInput from "./ChatInput";
import Logout from "./Logout";

export default function ChatContainer({currentUser, currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {

    const getAllRecievedMessages = async () => {
      const response = await axios.post(recieveMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }

    getAllRecievedMessages()
  }, [currentChat, currentUser]);

  console.log(messages)

  

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("CurrentUser")
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  // console.log(currentChat);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  console.log(arrivalMessage)

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='flex flex-col overflow-y-auto w-full md:w-[80vw] gap-4 justify-around text-white text-xl p-5'>
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center gap-1">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="text-white">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout currentUser={currentUser} />
      </div>
      <div className="px-1 py-2 h-[70vh] flex flex-col gap-1 overflow-y-scroll ">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`flex items-start ${
                  message.fromSelf ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`px-4 rounded-lg py-1 ${
                  message.fromSelf ? "bg-[#4f04ff21]" : "bg-[#9900ff20]"
                }`}>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

