import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-3">
            <div className="flex flex-col text-lg justify-center font-bold cursor-pointer">
                <Link to="/blog">Blogify</Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/GenerateyourthoughtswithAI">
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Generate with AI
                    </button>
                </Link>
                <Link to="/publish">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Write
                    </button>
                </Link>
                <Avatar name="Swastika" />
            </div>
        </div>
    );
};



