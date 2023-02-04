import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../public/assets/logo.svg";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const router = useRouter()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      router.push("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (name.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, name, password } = values;
      const { data } = await axios.post(registerRoute, {
        name,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "CurrentUser",
          JSON.stringify(data.user)
        );
        router.push("/");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-1 bg-[#131324]">
        <form action="" className="flex flex-col gap-16 p-24 bg-[#0A0A14] rounded-xl" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
          className="p-1 border-1 border-solid border-[#4e0eff] rounded-sm text-black w-full text-2xl focus:border-[4px] focus:border-[#997af0]"
            type="text"
            placeholder="Username"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <input
          className="p-1 border-1 border-solid border-[#4e0eff] rounded-sm text-black w-full text-2xl focus:border-[4px] focus:border-[#997af0]"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
          className="p-1 border-1 border-solid border-[#4e0eff] rounded-sm text-black w-full text-2xl focus:border-[4px] focus:border-[#997af0]"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
          className="p-1 border-1 border-solid border-[#4e0eff] rounded-sm text-black w-full text-2xl focus:border-[4px] focus:border-[#997af0]"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button className="text-white bg-[#4e0eff] px-1 py-2 border-none font-bold cursor-pointer rounded-md text-xl uppercase hover:bg-[#4e0eff]" type="submit">Create User</button>
          <span className="text-white uppercase">
            Already have an account ? <Link href="/login">Login.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

