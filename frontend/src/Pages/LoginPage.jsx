import React, { useState } from "react";
import { LanguagesIcon, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../lib/api.js";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // login mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged in successfully 🎉");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 font-[Poppins]"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #0d1b2a 50%, #000000 100%)",
      }}
    >
      <div className="border border-cyan-600/30 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        {/* LOGIN FORM - LEFT SIDE */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col text-gray-200"
        >
          {/* LOGO - CENTERED */}
          <div className="mb-10 flex flex-col items-center justify-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 shadow-lg">
              <LanguagesIcon className="size-12 text-white" />
            </div>
            <span className="mt-3 text-4xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-500">
              SpeakEasy
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-600/20 text-red-400 text-sm">
              {error?.response?.data?.message || "Something went wrong"}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full">
            <div className="space-y-7">
              {/* Heading */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">
                  Welcome Back ✨
                </h2>
                <p className="text-lg text-gray-400 mt-2">
                  Login to continue your language-learning adventure 🚀
                </p>
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg font-medium text-gray-300">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-lg rounded-lg focus:ring-2 focus:ring-cyan-500"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password with Eye Toggle */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg font-medium text-gray-300">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input input-bordered w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-lg rounded-lg focus:ring-2 focus:ring-cyan-500 pr-12"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Use at least 8 characters for your password.
                </p>
              </div>

              {/* Button */}
              <button
                className="btn w-full py-3 text-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 rounded-lg"
                type="submit"
              >
                {isPending ? "Logging in..." : "Login"}
              </button>

              {/* Signup Redirect */}
              <div className="text-center mt-4">
                <p className="text-lg text-gray-400">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-cyan-400 hover:underline font-medium"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </motion.div>

        {/* LOGIN INFO - RIGHT SIDE */}
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden lg:flex flex-col bg-gradient-to-br from-cyan-900 via-teal-900 to-gray-900 w-1/2 p-10"
        >
          <div className="max-w-md mx-auto my-auto text-center">
            {/* Illustration */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square max-w-sm mx-auto"
            >
              <img
                src="/i.png"
                alt="Language community illustration"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </motion.div>

            {/* Info */}
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-300">
                Your Global Language Hub 🌍
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Access thousands of conversations, interactive lessons, and real
                speaking practice with people from all over the world.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
