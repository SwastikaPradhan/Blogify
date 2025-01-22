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
     async function sendRequest() {  //http://127.0.0.1:8787/api/v1/user/signup
        try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup" ? "signup" : "signin"}`,postInputs);
        const jwt= response.data;
        localStorage.setItem("token",JSON.stringify(jwt));
        navigate("/blog");

        }
        catch(e){
            alert("Error while connecting");
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold">
                            Create an account
                        </div>
                        <div className="text-slate-400">
                            {type === "signin" ? "Don't have an account" : "Already have an account?"}
                            <Link className="underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signup" ? "Sign in" : "Sign up"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-5">
                        {type === "signup" ?

                            <LabelInput
                                label="Name"
                                placeholder="Swastika Pradhan....."
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setPostInputs ({
                                        ...postInputs,
                                        name: e.target.value
                                    });
                                }} /> : null
                        }
                        <div className="pt-2">
                            <LabelInput
                                label="Email"
                                placeholder="Swastika@gmail.com"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setPostInputs((currentInput) => ({
                                        ...currentInput,
                                        email: e.target.value
                                    }));                                   
                                }}
                                type="email"
                            />                            
                        </div>
                        <div className="pt-2">
                            <LabelInput
                                label="Password"
                                type={"password"}
                                placeholder="password"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setPostInputs((currentInput) => ({
                                        ...currentInput,
                                        password: e.target.value
                                    }));
                                }}
                            />
                        </div>
                        <div className="pt-5">
                            <button
                                type="button"
                                className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
                                onClick={sendRequest}
                            >
                                {type === "signup" ? "Sign up" : "Sign in"}
                            </button>
                        </div>
                        <button
                        onClick= {sendRequest}
                            type="button"
                            className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 
                        focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg 
                        text-sm px-5 py-2.5 text-center inline-flex items-center justify-center 
                        dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
                            > Login without credential
                        </button>
                    </div>
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
        <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-black font-bold">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
};