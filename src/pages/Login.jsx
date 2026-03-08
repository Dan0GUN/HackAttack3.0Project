import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("startup");
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Questionnaire");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const signupEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/Questionnaire");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/Questionnaire");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const loginGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      provider.addScope("user:email");
      await signInWithPopup(auth, provider);
      navigate("/Questionnaire");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (isSignup) {
      await signupEmail();
    } else {
      await loginEmail();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center px-6 pt-10">
      <div className="w-full max-w-[560px] bg-white">
        <h1 className="text-[42px] font-bold text-center text-black mb-2">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <p className="text-center text-[#60708A] text-[18px] mb-10">
          Select your account type to {isSignup ? "create an account" : "sign in"}
        </p>

        <div className="flex bg-[#eef1f5] rounded-2xl p-1 mb-10">
          <button
            onClick={() => setAccountType("startup")}
            className={`w-1/2 py-4 rounded-2xl text-[18px] font-medium transition ${
              accountType === "startup"
                ? "bg-white text-black shadow-sm"
                : "text-[#60708A]"
            }`}
          >
            Startup
          </button>

          <button
            onClick={() => setAccountType("mentor")}
            className={`w-1/2 py-4 rounded-2xl text-[18px] font-medium transition ${
              accountType === "mentor"
                ? "bg-white shadow text-black"
                : "text-gray-700"
            }`}
          >
            Mentor / Investor
          </button>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="name@example.com"
          className="w-full h-[56px] rounded-2xl border border-[#d8dee8] bg-white px-5 text-[16px] text-black placeholder:text-[#7a8597] outline-none focus:border-black mb-8"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex items-center justify-between mb-3">
          <label className="block text-black font-semibold text-[16px]">
            Password
          </label>

          {!isSignup && (
            <button
              type="button"
              className="text-[#2f6bff] text-[16px] font-medium"
            >
              Forgot?
            </button>
          )}
        </div>

        <input
          type="password"
          className="w-full h-[56px] rounded-2xl border border-[#d8dee8] bg-white px-5 text-[16px] text-black outline-none focus:border-black mb-8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full h-[60px] rounded-2xl bg-black text-white text-[18px] font-medium mb-8 hover:opacity-95 transition"
        >
          {isSignup
            ? `Create ${accountType === "startup" ? "Startup" : "Mentor"} Account`
            : `Sign In as ${accountType === "startup" ? "Startup" : "Mentor"}`}
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-600 text-sm whitespace-nowrap">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 h-px bg-[#d8dee8]" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <button
            onClick={loginGithub}
            className="h-[56px] rounded-2xl border border-[#d8dee8] bg-white flex items-center justify-center gap-3 text-[16px] font-medium text-black hover:bg-gray-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.52c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Github
          </button>

          <button
            onClick={loginGoogle}
            className="h-[56px] rounded-2xl border border-[#d8dee8] bg-white flex items-center justify-center gap-3 text-[16px] font-medium text-black hover:bg-gray-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Google
          </button>
        </div>

        <p className="text-center text-[16px] text-[#60708A]">
          {isSignup ? "Already have an account? " : "New here? "}
          <span
            className="text-black font-semibold cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Sign in" : "Create an account"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;