import React, { useEffect, useState } from "react";

export default function Contacts({ contacts, changeChat , currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("CurrentUser")
    )
    setCurrentUserName(data.name)
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && (
        <div className="flex w-full md:w-40 flex-col justify-around h-[20vh]  md:min-h-screen overflow-hidden bg-[#080420]">
          <div className="flex items-center justify-center gap-1">
            <h3 className="text-white uppercase">Chat App</h3>
          </div>
          <div className="flex flex-col">
            <div className="text-white text-center mb-5">Active Users</div>
            <div className="flex flex-row md:flex-col justify-center items-center overflow-x-scroll md:overflow-y-scroll gap-1 px-5">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`bg-[#ffffff34] flex min-h-5 p-1 cursor-pointer rounded-lg items-center transition duration-500 ease-in-out ${
                    index === currentSelected ? "bg-[#9a86f3]" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
 
                  
                  <div className="text-white">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#0d0d30]">
            <div className="username">
              <h2 className="text-green-700">you are {currentUserName}</h2>
            </div>
          </div>
        </div>
        
      )}
    </>
  );
}
