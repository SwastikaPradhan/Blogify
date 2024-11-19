import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea onChange={onChange} id="editor" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your Thoughts..." required />
                </div>
            </div>
        </div>
    </div>

}


