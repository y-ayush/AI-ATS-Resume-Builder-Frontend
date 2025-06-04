import React, { useState } from "react";
import {
    FaUser,
    FaLock,
    FaSignInAlt,
    FaUserPlus,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login.js";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [signUpError, setSignUpError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInError, setSignInError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignInSubmit = async (event) => {
        setSignInError("");
        event.preventDefault();
        const { email, password } = event.target.elements;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        const data = {
            email: email.value,
            password: password.value,
        };

        try {
            console.log("Login Started in Frontend");
            const user = await loginUser(data);
            console.log("Login Completed");

            if (user?.statusCode === 200) {
                navigate("/");
            }
            console.log(user);
        } catch (error) {
            setSignInError(error.message);
            console.log("Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpSubmit = async (event) => {
        setSignUpError("");
        event.preventDefault();
        const { fullname, email, password } = event.target.elements;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        console.log("User Registration Started");
        const data = {
            fullName: fullname.value,
            email: email.value,
            password: password.value,
        };
        try {
            const response = await registerUser(data);
            if (response?.statusCode === 201) {
                console.log("User Registration Started");
                handleSignInSubmit(event);
            }
        } catch (error) {
            console.log("User Registration Failed");
            setSignUpError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-gray-900 to-gray-800">
            <motion.div
                className="relative w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl shadow-gray-900/50"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-around mb-6 border-b border-gray-700">
                    <button
                        onClick={() => setIsSignUp(false)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-t-lg ${
                            !isSignUp
                                ? "bg-green-600 text-gray-100"
                                : "text-gray-400 hover:text-gray-300"
                        }`}
                    >
                        <FaSignInAlt />
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsSignUp(true)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-t-lg ${
                            isSignUp
                                ? "bg-green-600 text-gray-100"
                                : "text-gray-400 hover:text-gray-300"
                        }`}
                    >
                        <FaUserPlus />
                        Sign Up
                    </button>
                </div>

                <div className="relative overflow-hidden h-80">
                    <motion.div
                        className={`absolute inset-0 transition-transform duration-500 ${
                            isSignUp ? "translate-x-0" : "translate-x-full"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isSignUp ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">
                            Sign Up
                        </h2>
                        <form
                            onSubmit={handleSignUpSubmit}
                            className="space-y-4"
                        >
                            <div className="flex items-center border rounded-md border-gray-600 p-2 gap-3 bg-gray-700">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Full Name"
                                    required
                                    className="outline-none w-full bg-transparent text-gray-100"
                                />
                            </div>
                            <div className="flex items-center border rounded-md border-gray-600 p-2 gap-3 bg-gray-700">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="outline-none w-full bg-transparent text-gray-100"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="flex items-center border rounded-md border-gray-600 p-2 gap-3 bg-gray-700">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="outline-none w-full bg-transparent text-gray-100"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="text-gray-400 ml-2 hover:text-gray-300"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-gray-100 py-2 rounded-md flex justify-center items-center transition-colors"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin text-center text-white" />
                                ) : (
                                    "Register User"
                                )}
                            </button>
                            {signUpError && (
                                <div className="text-red-400 text-center mt-2">
                                    {signUpError}
                                </div>
                            )}
                        </form>
                    </motion.div>

                    <motion.div
                        className={`absolute inset-0 transition-transform duration-500 ${
                            isSignUp ? "-translate-x-full" : "translate-x-0"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: !isSignUp ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">
                            Sign In
                        </h2>
                        <form
                            onSubmit={handleSignInSubmit}
                            className="space-y-4"
                        >
                            <div className="flex items-center border rounded-md border-gray-600 p-2 gap-3 bg-gray-700">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="outline-none w-full bg-transparent text-gray-100"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="flex items-center border rounded-md border-gray-600 p-2 gap-3 bg-gray-700">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="outline-none w-full bg-transparent text-gray-100"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="text-gray-400 ml-2 hover:text-gray-300"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-gray-100 py-2 rounded-md flex justify-center items-center transition-colors"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin text-center text-white" />
                                ) : (
                                    "Login"
                                )}
                            </button>
                            {signInError && (
                                <div className="text-red-400 text-center mt-2">
                                    {signInError}
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>

                <p className="mt-4 text-center text-gray-400">
                    {isSignUp ? (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={() => setIsSignUp(false)}
                                className="text-green-500 hover:text-green-400 transition-colors"
                            >
                                Sign In
                            </button>
                        </>
                    ) : (
                        <>
                            Don’t have an account?{" "}
                            <button
                                onClick={() => setIsSignUp(true)}
                                className="text-green-500 hover:text-green-400 transition-colors"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </p>
            </motion.div>
        </div>
    );
}

export default AuthPage;
