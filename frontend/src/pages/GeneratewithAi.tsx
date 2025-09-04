import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from "react-markdown";
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Bot, Copy, Edit3, Sparkles, Wand2 } from "lucide-react";

const TextGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [generatedBlog, setGeneratedBlog] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [blogTitle, setBlogTitle] = useState("");
    const navigate = useNavigate();

   const apiKey: string = import.meta.env.VITE_GEMINI_API_KEY as string;


    const genAI = new GoogleGenerativeAI(apiKey);

    const handleGenerate = async () => {
        if (!prompt) {
            toast.error("Please enter a blog topic or prompt.");
            return;
        }

        try {
            setIsLoading(true);

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const enhancedPrompt = `Write a comprehensive blog post about: ${prompt}. 
            Please format it with a clear title, introduction, main sections with headings, and a conclusion. 
            Make it engaging and informative. Use markdown formatting for better readability.`;

            const result = await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: enhancedPrompt },
                        ],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 2000,
                    temperature: 0.7,
                },
            });

            const blogContent = result.response.text();
            setGeneratedBlog(blogContent);

            // Extract title from the generated content (first heading)
            const titleMatch = blogContent.match(/^#\s+(.+)$/m);
            if (titleMatch) {
                setBlogTitle(titleMatch[1]);
            } else {
                setBlogTitle(prompt); // Fallback to prompt as title
            }

            toast.success("Blog post generated successfully!");
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

    const handleCreateBlogPost = async () => {
        if (!generatedBlog) {
            toast.error("Please generate a blog post first.");
            return;
        }

        try {
            const rawtoken = localStorage.getItem("token");
            const token=rawtoken?.replace(/^"|"$/g, "");

           
            if (!token) {
                toast.error("Please login to create a blog post.");
                navigate("/signin");
                return;
            }

            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                    title: blogTitle || "AI Generated Blog Post",
                    content: generatedBlog,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Blog post created successfully!");
            navigate(`/blog/${response.data.id}`);
        } catch (error: any) {
            toast.error("Failed to create blog post. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Appbar />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <Bot className="w-8 h-8 text-blue-400 mr-3" />
                        <h1 className="text-4xl font-bold text-white">AI Blog Generator</h1>
                        <Sparkles className="w-8 h-8 text-yellow-400 ml-3" />
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Transform your ideas into engaging blog posts with the power of AI.
                        Simply describe your topic and let our AI create professional content for you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-2xl">
                            <div className="flex items-center mb-4">
                                <Edit3 className="w-5 h-5 text-blue-400 mr-2" />
                                <h2 className="text-xl font-semibold text-white">Describe Your Blog Topic</h2>
                            </div>

                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Enter your blog topic, idea, or detailed prompt here... 

Examples:
• 'Write about the benefits of meditation for mental health'
• 'Create a guide on sustainable living practices'
• 'Explain machine learning concepts for beginners'"
                                rows={8}
                                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-200"
                                maxLength={1000}
                            />

                            <div className="flex justify-between items-center mt-3">
                                <span className="text-gray-400 text-sm">
                                    {prompt.length} / 1000 characters
                                </span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setPrompt("")}
                                        className="px-3 py-1 text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded transition-colors duration-200"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={isLoading || !prompt.trim()}
                                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                                font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed 
                                transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Generating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5" />
                                        <span>Generate Blog Post</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="space-y-6">
                        {isLoading && (
                            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-2xl">
                                <div className="text-center">
                                    <div className="animate-pulse flex flex-col items-center">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                                            <Bot className="w-6 h-6 text-white animate-bounce" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">AI is Writing...</h3>
                                        <p className="text-gray-400 mb-4">Please wait while we craft your blog post</p>
                                        <div className="w-full bg-gray-800 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {generatedBlog && (
                            <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                                {/* Generated Content Header */}
                                <div className="border-b border-gray-700 p-6 bg-gradient-to-r from-gray-800 to-gray-900">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold text-white flex items-center">
                                            <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
                                            Generated Blog Post
                                        </h2>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={handleCopy}
                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                                            >
                                                <Copy className="w-4 h-4" />
                                                <span>Copy</span>
                                            </button>
                                            <button
                                                onClick={handleCreateBlogPost}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                                <span>Create Blog Post</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Generated Content */}
                                <div className="p-6 max-h-96 overflow-y-auto">
                                    <div className="prose prose-invert max-w-none">
                                        <ReactMarkdown
                                            components={{
                                                h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-4">{children}</h1>,
                                                h2: ({ children }) => <h2 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h2>,
                                                h3: ({ children }) => <h3 className="text-lg font-semibold text-white mb-2 mt-4">{children}</h3>,
                                                p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                                                ul: ({ children }) => <ul className="text-gray-300 mb-4 ml-4">{children}</ul>,
                                                ol: ({ children }) => <ol className="text-gray-300 mb-4 ml-4">{children}</ol>,
                                                li: ({ children }) => <li className="mb-1">{children}</li>,
                                                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                                                em: ({ children }) => <em className="text-gray-200 italic">{children}</em>,
                                                code: ({ children }) => <code className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm">{children}</code>,
                                            }}
                                        >
                                            {generatedBlog}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tips Section */}
                        {!generatedBlog && !isLoading && (
                            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-2xl">
                                <h3 className="text-lg font-semibold text-white mb-4">💡 Tips for Better Results</h3>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="flex items-start">
                                        <span className="text-blue-400 mr-2">•</span>
                                        Be specific about your topic and target audience
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-400 mr-2">•</span>
                                        Include keywords or themes you want to cover
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-400 mr-2">•</span>
                                        Mention the desired tone (professional, casual, etc.)
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-400 mr-2">•</span>
                                        Specify if you need examples or case studies
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer
                theme="dark"
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default TextGenerator;




