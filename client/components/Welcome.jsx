import React, { useEffect, useState } from "react";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect( () => {
    setUserName(
       JSON.parse(
        localStorage.getItem("CurrentUser")
      ).name
    );
  }, []);

  return (
    <div className="flex flex-col w-[100vw] md:w-[80vw] min-h-screen justify-center items-center text-white">
      <h1>
        Welcome, <span className="text-[#4e0eff]">{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}


