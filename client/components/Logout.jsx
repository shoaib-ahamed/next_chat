import axios from "axios";
import { useRouter } from 'next/router';
import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout({currentUser}) {
  const router = useRouter();

  const handleClick = async () => {
    const data = await axios.get(`${logoutRoute}/${currentUser._id}`);
    if (data.status === 200) {
      localStorage.clear();
      router.push("/login");
    }
  };
  return (
    <div className="flex justify-center items-center p-[0.5rem] border rounded-lg bg-[#9a86f3] border-none cursor-pointer" onClick={handleClick}>
      <BiPowerOff />
    </div>
  );
}


