import React, { useState, useEffect, useContext} from "react";
import { GiCrossMark } from "react-icons/gi";
import {StoreContext} from "../context/StoreContext.jsx"
import axios from "axios";


const LoginPopup = ({ setShowLogin }) => {
  const {url, setToken} = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  //With the help of This one function I have handle and store name,email and password to State variable
  const onchangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))  //name and value both dynamically set by function
  }


  
  const onLogin = async(e) =>{
    e.preventDefault();
    let newURl = url;
    if(currState === 'Login'){
      newURl += "api/user/login"
    }else{
      newURl += "api/user/register"
    }

    const response = await axios.post(newURl,data);

    //%% IMPORTANT TOKEN SAVE PART HERE
    if(response.data.success){
        setToken(response.data.token);  //data.token getting from backend response
        localStorage.setItem("token", response.data.token); //Save to browser local Storage
        setShowLogin(false);
    }else{
      alert(response.data.message);
    }


  }


  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60">
      <form onSubmit={onLogin} className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-6 animate-fadeIn m-4 sm:mx-6">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">{currState}</h2>
          <button className="text-gray-500 hover:text-gray-800" type="button" onClick = {() => setShowLogin(false)}>
            <GiCrossMark size={25} className="text-red-600" />
          </button>
        </div>

        <div className="space-y-4">
            {currState === "Sign Up" && (
              //data.name Came from State variable
            <input name="name" onChange={onchangeHandler} value={data.name} type="text" placeholder="Your Name" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            )}
            <input name="email" onChange={onchangeHandler} value={data.email} type="email" placeholder="Email" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="password" onChange={onchangeHandler} value={data.password} type="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

        </div>

        <button type="submit" className="w-full py-2 text-white bg-orange-400 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="flex items-center text-gray-500 text-xs">
          <input type="checkbox" required className="mr-2" />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>

            {currState === "Login" ? (
              <p className="text-center text-sm text-gray-600">
                Create a new account?{" "}
                <span onClick={()=> setCurrState("Sign Up")} className="text-blue-500 cursor-pointer hover:underline">
                  Click here
                </span>
              </p>
            ):(<p className="text-center text-sm text-gray-600"> Already have an account?{""} <span onClick={()=>setCurrState("Login")} className="text-blue-500 cursor-pointer hover:underline">Login here</span></p>)}
      </form>
    </div>
  );
};

export default LoginPopup;
