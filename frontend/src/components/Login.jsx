import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Login = () => {
  const [userState, setUserState] = useState("Log In");

  const { setShowLogin } = useContext(AppContext);

  //when login pop-up is present, user can't scroll past it
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        className="relative bg-white p-10 rounded-xl text-slate-500 text-center"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-3">
          {userState}
        </h1>
        <p>Welcome to WordCanvas!</p>{" "}
        <p>
          Please {userState === "Log In" ? "log in" : "sign up"} to continue.
        </p>
        {useState !== "Log in" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.user_icon} alt="lock" width={20} />
            <input
              type="text"
              placeholder="Full name"
              required
              className="outline-none text-sm"
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="envelope" width={20} />
          <input
            type="email"
            placeholder="Email"
            required
            className="outline-none text-sm"
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="lock" width={20} />
          <input
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm"
          />
        </div>
        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot password?
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {userState === "Log In" ? "Log In" : "Create new account"}
        </button>
        {userState === "Log In" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setUserState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setUserState("Log In")}
            >
              Log in
            </span>
          </p>
        )}
        <img
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </div>
  );
};

export default Login;
