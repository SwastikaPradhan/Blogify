import React, { useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        } 

        
        catch (error: any) {
            toast.error(`Error: ${error.response?.data?.error?.message || "Unable to generate content."}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Appbar />

            <div className="flex flex-col items-center p-4">

                <h1 className="text-2xl font-bold mb-4">Blog Post Generator</h1>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your blog topic or idea..."
                    rows={5}
                    className="w-full max-w-md p-2 border rounded mb-4"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {isLoading ? "Generating..." : "Generate Blog Post"}
                </button>
                {generatedBlog && (
                    <div className="mt-6 p-4 border rounded bg-gray-50">
                        <h2 className="text-xl font-semibold mb-2">Generated Blog Post</h2>
                        <p>{generatedBlog}</p>
                    </div>
                )}
                <ToastContainer />
            </div>

        </div>

    );
};

export default TextGenerator;



