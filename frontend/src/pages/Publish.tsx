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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Appbar />
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
                <h1 className="text-3xl font-semibold text-gray-100 mb-8">Publish Blog</h1>

                <div className="space-y-6 bg-gray-900 shadow-md rounded-2xl p-6 border border-gray-700">
                    <div>
                        <input
                            type="text"
                            className="w-full px-4 py-3 text-lg border border-gray-700 rounded-xl shadow-sm bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Enter your blog title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <TextEditor
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`px-6 py-3 text-sm font-medium rounded-xl shadow-md text-white transition-all duration-200 ${loading
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400'
                                }`}
                        >
                            {loading ? 'Publishing...' : 'Publish Post'}
                        </button>
                    </div>
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
  <div className="flex items-center justify-between border border-gray-700 rounded-xl">
    <div className="my-2 bg-black rounded-b-lg w-full">
      <label className="sr-only">Publish post</label>
      <textarea
        id="editor"
        rows={8}
        className="focus:outline-none block w-full px-2 py-2 text-sm text-gray-200 bg-gray-900 border-0 rounded-lg placeholder-gray-400"
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