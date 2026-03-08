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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // EMAIL LOGIN
  const loginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Questionnaire");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // EMAIL SIGNUP
  const signupEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User created:", userCredential.user);

      navigate("/Questionnaire");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Account already exists. Please sign in instead.");
      } else {
        console.error(error);
        alert(error.message);
      }
    }
  };

  // GOOGLE LOGIN
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

  // GITHUB LOGIN
  const loginGithub = async () => {
    try {
      const provider = new GithubAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      await signInWithPopup(auth, provider);

      navigate("/Questionnaire");
    } catch (error) {
      console.error(error);
      alert(error.message);
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
            className={`w-1/2 py-4 rounded-2xl text-[18px] font-medium ${
              accountType === "startup"
                ? "bg-white text-black shadow-sm"
                : "text-[#60708A]"
            }`}
          >
            Startup
          </button>

          <button
            onClick={() => setAccountType("mentor")}
            className={`w-1/2 py-4 rounded-2xl text-[18px] font-medium ${
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
          className="w-full h-[56px] rounded-2xl border border-[#d8dee8] px-5 mb-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-black font-semibold mb-2">
          Password
        </label>

        <input
          type="password"
          className="w-full h-[56px] rounded-2xl border border-[#d8dee8] px-5 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginEmail}
          className="w-full h-[60px] bg-black text-white rounded-2xl mb-4"
        >
          Sign In
        </button>

        <button
          onClick={signupEmail}
          className="w-full h-[60px] border border-black rounded-2xl mb-8"
        >
          Create Account
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={loginGithub}
            className="h-[56px] border rounded-2xl"
          >
            Github
          </button>

          <button
            onClick={loginGoogle}
            className="h-[56px] border rounded-2xl"
          >
            Google
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;