import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

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
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              className="w-1/2 px-3 py-2 border border-gray-800"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border border-gray-800"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border border-gray-800"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full px-3 py-2 border border-gray-800"
          />
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border border-gray-800"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border border-gray-800"
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
            }}
          >
            Create account!
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => {
              setCurrentState("Login");
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
