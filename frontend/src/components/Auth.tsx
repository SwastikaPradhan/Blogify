import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@swastikapradhan669/blogify-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            console.log(jwt);
            localStorage.setItem("token", jwt);
            navigate("/blog");
        } catch (e) {
            alert("Error while connecting");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-black p-4">
            <div className="w-full max-w-md">
                {/* Main Auth Card */}
                <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {type === "signup" ? "Create Account" : "Welcome Back"}
                        </h1>
                        <p className="text-gray-400 text-sm">
                            {type === "signup" ? "Join our community today" : "Sign in to your account"}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {type === "signup" && (
                            <LabelInput
                                label="Full Name"
                                placeholder="Enter your full name"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setPostInputs({
                                        ...postInputs,
                                        name: e.target.value
                                    });
                                }}
                            />
                        )}

                        <LabelInput
                            label="Email Address"
                            placeholder="Enter your email"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPostInputs((currentInput) => ({
                                    ...currentInput,
                                    email: e.target.value
                                }));
                            }}
                            type="email"
                        />

                        <LabelInput
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPostInputs((currentInput) => ({
                                    ...currentInput,
                                    password: e.target.value
                                }));
                            }}
                        />

                        {/* Main Action Button */}
                        <button
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors 
                            duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 mt-6"
                            onClick={sendRequest}
                        >
                            {type === "signup" ? "Create Account" : "Sign In"}
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-900 text-gray-400">or</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link 
                                className="text-blue-400 hover:text-blue-300 font-medium ml-1 transition-colors duration-200" 
                                to={type === "signin" ? "/signup" : "/signin"}
                            >
                                {type === "signup" ? "Sign in" : "Sign up"}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Brand Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-xs">
                        Powered by <span className="font-semibold text-white">Blogify</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

interface LabelInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const LabelInput = ({ label, placeholder, onChange, type = "text" }: LabelInputType) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="w-full bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500
                 focus:border-blue-500 p-3 placeholder-gray-400 transition-colors duration-200"
                placeholder={placeholder}
                required
            />
        </div>
    );
};