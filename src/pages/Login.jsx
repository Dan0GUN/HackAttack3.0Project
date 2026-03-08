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
      navigate("/questionnaire");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const signupEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User created:", userCredential.user);
      navigate("/questionnaire");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Account already exists. Please sign in instead.");
      } else {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/questionnaire");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const loginGithub = async () => {
    try {
      const provider = new GithubAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      await signInWithPopup(auth, provider);
      navigate("/questionnaire");
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

        {/* ACCOUNT TYPE TOGGLE */}
        <div className="flex bg-white rounded-2xl p-1 mb-10 border border-gray-200">

          <button
            onClick={() => setAccountType("startup")}
            className={`w-1/2 py-4 rounded-2xl text-[18px] font-medium transition ${
              accountType === "startup"
                ? "bg-white text-black shadow"
                : "bg-transparent text-gray-500"
            }`}
          >
            Startup
          </button>

          <button
            onClick={() => setAccountType("mentor")}
            className={`w-1/2 py-4 rounded-2xl text-[18px] font-medium transition ${
              accountType === "mentor"
                ? "bg-white text-black shadow"
                : "bg-transparent text-gray-500"
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
          className="w-full h-[56px] rounded-2xl border border-gray-300 px-5 mb-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex items-center justify-between mb-2">
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
          className="w-full h-[56px] rounded-2xl border border-gray-300 px-5 mb-6"
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
          <span className="text-sm text-gray-500">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">

          <button
            onClick={loginGithub}
            className="h-[56px] border border-gray-300 rounded-2xl"
          >
            Github
          </button>

          <button
            onClick={loginGoogle}
            className="h-[56px] border border-gray-300 rounded-2xl"
          >
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