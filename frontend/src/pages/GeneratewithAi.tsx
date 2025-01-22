import React, { useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from "react-markdown";
import { Appbar } from "../components/Appbar";

const TextGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [generatedBlog, setGeneratedBlog] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const apiKey = "AIzaSyBR3qTcLtGY5D7PklPA90vnGszJKH4YP9o";
    const genAI = new GoogleGenerativeAI(apiKey);

    const handleGenerate = async () => {
        if (!prompt) {
            toast.error("Please enter a blog topic or prompt.");
            return;
        }

        try {
            setIsLoading(true);

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: prompt },
                        ],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                },
            });

            setGeneratedBlog(result.response.text());
        } catch (error: any) {
            toast.error(`Error: ${error.response?.data?.error?.message || "Unable to generate content."}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedBlog);
        toast.success("Blog post copied to clipboard!");
    };

    return (
        <div>
            <Appbar />
            <div className="flex flex-col items-center p-4">
                <h1 className="text-3xl font-bold mb-6 text-blue-700">AI Blog Post Generator</h1>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your blog topic or idea..."
                    rows={5}
                    className="w-full max-w-md p-4 border rounded-lg mb-2 text-lg focus:outline-blue-500"
                />
                <span className="text-gray-500 text-sm mb-4">
                    {prompt.length} / 1000 characters
                </span>
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? "Generating..." : "Generate Blog Post"}
                </button>

                {isLoading && (
                    <div className="mt-6">
                        <div className="loader"></div>
                        <p className="text-gray-500">Please wait while we generate your blog post...</p>
                    </div>
                )}

                {generatedBlog && (
                    <div className="mt-8 w-full max-w-3xl p-6 border rounded-lg shadow-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-blue-700">Generated Blog Post</h2>
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Copy
                            </button>
                        </div>
                        <div className="prose max-w-none">
                            <ReactMarkdown>{generatedBlog}</ReactMarkdown>
                        </div>
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default TextGenerator;





