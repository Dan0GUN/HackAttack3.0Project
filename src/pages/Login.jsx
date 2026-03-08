import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("startup");
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
      provider.setCustomParameters({
        allow_signup: "true",
      });

      const result = await signInWithPopup(auth, provider);
      console.log("GitHub login success:", result.user);

      navigate("/Questionnaire");
    } catch (error) {
      console.error("GitHub login error:", error);

      switch (error.code) {
        case "auth/account-exists-with-different-credential":
          alert(
            "An account already exists with the same email but a different sign-in method. Try logging in with Google or email/password first."
          );
          break;
        case "auth/popup-closed-by-user":
          alert("GitHub sign-in popup was closed before completing login.");
          break;
        case "auth/popup-blocked":
          alert("Popup was blocked by the browser. Please allow popups and try again.");
          break;
        case "auth/cancelled-popup-request":
          alert("Only one popup request is allowed at a time.");
          break;
        case "auth/operation-not-allowed":
          alert("GitHub sign-in is not enabled in Firebase.");
          break;
        default:
          alert(error.message || "GitHub login failed.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center px-6 pt-10">
      <div className="w-full max-w-[560px] bg-white">
        <h1 className="text-[42px] font-bold text-center text-black mb-2">
          Login
        </h1>

        <p className="text-center text-[#60708A] text-[18px] mb-10">
          Select your account type to sign in
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

          <button
            type="button"
            className="text-[#2f6bff] text-[16px] font-medium"
          >
            Forgot?
          </button>
        </div>

        <input
          type="password"
          className="w-full h-[56px] rounded-2xl border border-[#d8dee8] bg-white px-5 text-[16px] text-black outline-none focus:border-black mb-8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginEmail}
          className="w-full h-[60px] rounded-2xl bg-black text-white text-[18px] font-medium mb-8 hover:opacity-95 transition"
        >
          Sign In as {accountType === "startup" ? "Startup" : "Mentor"}
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
            Github
          </button>

          <button
            onClick={loginGoogle}
            className="h-[56px] rounded-2xl border border-[#d8dee8] bg-white flex items-center justify-center gap-3 text-[16px] font-medium text-black hover:bg-gray-50 transition"
          >
            Google
          </button>
        </div>

        <p className="text-center text-[16px] text-[#60708A]">
          New here?{" "}
          <span
            className="text-black font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;