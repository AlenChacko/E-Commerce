import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign up") {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }
        const response = await axios.post(backendUrl + "/api/user/register", {
          firstName,
          lastName,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Registration failed");
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Invalid Email or Password");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign up" ? (
        <>
          {/* First & Last Name */}
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="First Name"
              required
              className="w-1/2 px-3 py-2 border border-gray-800"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              className="w-1/2 px-3 py-2 border border-gray-800"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border border-gray-800"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border border-gray-800"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full px-3 py-2 border border-gray-800"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border border-gray-800"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border border-gray-800"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </>
      )}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => {
              setCurrentState("Sign up");
              setConfirmPassword("");
            }}
          >
            Create account!
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => {
              setCurrentState("Login");
              setConfirmPassword("");
            }}
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
