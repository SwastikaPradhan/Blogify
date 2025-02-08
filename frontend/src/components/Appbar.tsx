
import { Link, useNavigate } from "react-router-dom";
import {MouseEventHandler, useState } from "react";

export const Appbar = () => {


    return (
        <div className="border-b flex justify-between px-10 py-3 h-16">
            <div className="flex flex-col text-lg justify-center font-bold cursor-pointer">
                <Link to="/blog" className="flex items-center text-4xl font-bold text-stone-800">Blogify</Link>
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

function ProfileBox() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    const getName = localStorage.getItem("name") || "Swastika";

    return (
        <div className="relative cursor-pointer">
            
            <div onClick={() => setShow(!show)}>
                <Avatar name={getName} />
            </div>
            {show && (
                <div className="absolute -bottom-24 -left-16 shadow-lg p-4 bg-gray-50 border border-gray-100 z-50 w-[160px]">
                    <div className="flex flex-col gap-3">
                        <div onClick={logout}>Logout</div>
                    </div>
                </div>
            )}
        </div>
    );
}
export function Avatar({ name, onClick }: { name: string; onClick?: MouseEventHandler<HTMLDivElement> }) {
    return (
        <div
            onClick={onClick}
            className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 hover:bg-gray-50 rounded-full"
        >
            <span className="font-medium text-gray-600">
                {name.split(" ")?.[0]?.[0]}
                {name?.split(" ")?.[1]?.[0]}
            </span>
        </div>
    );
}
export default ProfileBox;



