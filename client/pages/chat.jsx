import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUsersRoute, host } from '../utils/APIRoutes';




export default function Chat() {
  const router = useRouter();

  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if(!localStorage.getItem("CurrentUser")){
      router.push('/login')
    }else{
      const data =  JSON.parse(
        localStorage.getItem("CurrentUser")
      )
      setCurrentUser(data)
    }
  }, [router]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect( () => {
    const getAllUsers = async () => {
      if (currentUser) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } 
    }

    getAllUsers()
  }, [currentUser]);

  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <div className="w-full gap-1 bg-[#131324]">
        <div className='flex flex-col md:flex-row'>
          <Contacts  currentUser={currentUser} contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome/>
          ) : (
            <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}




