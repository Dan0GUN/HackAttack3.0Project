import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

function Login() {

  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("startup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginEmail = async () => {
    try {

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const loginGoogle = async () => {

    try {

      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-[420px] p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold text-center mb-2">
          Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Select your account type to sign in
        </p>

        {/* Account Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">

          <button
            onClick={() => setAccountType("startup")}
            className={`flex-1 py-2 rounded-lg ${
              accountType === "startup"
                ? "bg-white shadow"
                : "text-gray-500"
            }`}
          >
            Startup
          </button>

          <button
            onClick={() => setAccountType("mentor")}
            className={`flex-1 py-2 rounded-lg ${
              accountType === "mentor"
                ? "bg-white shadow"
                : "text-gray-500"
            }`}
          >
            Mentor / Investor
          </button>

        </div>

        {/* Email */}
        <label className="text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="name@example.com"
          className="w-full border rounded-lg p-3 mt-1 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="flex justify-between text-sm">
          <label>Password</label>
          <a className="text-blue-500 cursor-pointer">
            Forgot?
          </a>
        </div>

        <input
          type="password"
          className="w-full border rounded-lg p-3 mt-1 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Sign in button */}
        <button
          onClick={loginEmail}
          className="w-full bg-black text-white py-3 rounded-lg mb-6"
        >
          Sign In as {accountType === "startup" ? "Startup" : "Mentor"}
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">

          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="px-3 text-gray-400 text-sm">
            OR CONTINUE WITH
          </span>

          <div className="flex-1 h-px bg-gray-300"></div>

        </div>

        {/* OAuth Buttons */}
        <div className="flex gap-3 mb-6">

          <button
            onClick={loginGoogle}
            className="flex-1 border rounded-lg py-3 hover:bg-gray-50"
          >
            Google
          </button>

        </div>

        {/* Create account */}
        <p className="text-center text-sm text-gray-500">
          New here?{" "}
          <span className="font-medium text-black cursor-pointer">
            Create an account
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;