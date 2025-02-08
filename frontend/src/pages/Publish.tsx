import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BACKEND_URL } from "../config";

export const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    return (
      <>
        <Appbar />
        <div className="flex justify-center">
          <div className="mt-16 w-1/2 text-center">
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              placeholder="Title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your message
            </label>
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              rows={10}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your blog here..."
            ></textarea>
            <button
              onClick={async () => {

                console.log("Title:", title); 
                console.log("Content:", content); 
               
                const res = await axios.post(
                    `${BACKEND_URL}/api/v1/blog`,
                    {
                      title,
                      content,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type":"application/json",
                      },
                    }
                  );
                  console.log("Response:" ,res.data);
                  navigate(`/blog/${res.data.id}`);

            
              }}
              type="button"
              className="relative inline-block text-lg group mt-8"
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-[28rem] h-96 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">Publish</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </button>
          </div>
        </div>
      </>
    );
  };