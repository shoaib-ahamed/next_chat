import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const router = useRouter()

  const [values, setValues] = useState({ email: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("CurrentUser")) {
      router.push("/chat");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, password } = values;

    console.log("from valid form :", email, password);
    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;

      console.log(email , password);
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

   
      
      if (data.status === true) {
        localStorage.setItem(
          "CurrentUser",
          JSON.stringify({name: data.user.name , _id: data.user._id , email: email})
        );

        router.push("/chat");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-1 bg-[#131324] ">
        <form action="" className="flex flex-col gap-16 p-24 bg-[#0A0A14] rounded-xl" onSubmit={(event) => handleSubmit(event)}>
          <div className="flex justify-center items-center gap-1">
            <div className="text-white text-3xl">Log In</div>
          </div>
          <input
            className="p-1 border-1 border-solid border-[#4e0eff] rounded-sm text-black w-full text-xl focus:border-[4px] focus:border-[#997af0]"
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
          className="p-1 border-1 border-solid border-[#4e0eff] rounded-sm text-white w-full text-xl focus:border-[4px] focus:border-[#997af0]"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button className="text-white bg-[#4e0eff] px-1 py-2 border-none font-bold cursor-pointer rounded-md text-xl uppercase hover:bg-[#4e0eff]" type="submit">Log In</button>
          <span className="text-white uppercase">
            Dont have an account ?<span className="text-[#4e0eff] font-bold decoration-0"> <Link  href="/register">Create One.</Link></span>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

