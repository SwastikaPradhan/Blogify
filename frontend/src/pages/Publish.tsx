import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const rawtoken = localStorage.getItem("token");
            const token = rawtoken?.replace(/^"|"$/g, "");
           
            if (!token) {
                alert("No authentication token found. Please login again.");
                navigate("/signin");
                return;
            }

            if (!title.trim()) {
                alert("Please enter a title");
                return;
            }

            if (!content.trim()) {
                alert("Please enter some content");
                return;
            }

            const requestData = {
                title: title.trim(),
                content: content.trim()
            };

            const requestConfig = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/blog`, 
                requestData,
                requestConfig
            );
            localStorage.setItem("authorId", res.data.user_id);
            localStorage.setItem("postId", res.data.id);
            
            alert("Blog published successfully!");
            navigate(`/blog/${res.data.id}`);
            
        } catch (error: any) {
            console.error("Full error object:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Appbar />
            <div className="flex flex-col gap-8 p-4 md:p-10">
                <div className="my-2 w-full">
                    <input
                        type="text"
                        className="bg-gray-50 text-gray-900 text-lg hover:border-blue-500 focus:border-blue-800 active:border-blue-800 outline-none block w-full p-4"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <TextEditor 
                    value={content}
                    onChange={(e) => setContent(e.target.value)} 
                />
                <div className="my-1">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`mt-0 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-700 hover:bg-blue-800'
                        }`}
                    >
                        {loading ? 'Publishing...' : 'Publish post'}
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ 
    onChange, 
    value 
}: { 
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
}) {
    return (
        <div className="w-full mb-4">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea
                        id="editor"
                        rows={8}
                        className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                        placeholder="Write an article..."
                        value={value}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>
        </div>
    );
}