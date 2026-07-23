import React, { useContext, useEffect, useState } from "react";
import { ShopeContext } from "../context/ShopeContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [currentState, setCurrentState] = useState("Login")
  const { token, setToken, navigate, backendUrl } = useContext(ShopeContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(backendUrl);

    try {
      if (currentState === "Sign Up") {
        const responce = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (responce.data.success) {
          setToken(responce.data.token);
          localStorage.setItem("token", responce.data.token);
        } else {
          toast.error(responce.data.message);
        }
      } else {
        const responce = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (responce.data.success) {
          setToken(responce.data.token);
          console.log(responce.config.data);

          localStorage.setItem("token", responce.data.token);
          console.log('done');

        } else {
          toast.error(responce.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {
        currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} className="w-full px-3 py-2 border border-gray-800" type="text" placeholder="Name" required />
      }
      <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full px-3 py-2 border border-gray-800" type="email" placeholder="Email" required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-3 py-2 border border-gray-800" type="password" placeholder="Password" required />
      <div className="w-full flex justify-between text-sm  mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {
          currentState === 'Login' ? <p className="cursor-pointer" onClick={() => { setCurrentState('Sign Up') }}>Create account</p> : <p className="cursor-pointer" onClick={() => { setCurrentState('Login') }}>Login</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  );
}

export default Login;
