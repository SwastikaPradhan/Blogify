import { Link, useNavigate } from "react-router-dom";
import { MouseEventHandler, useState } from "react";
import { PiHandbagFill } from "react-icons/pi";
export const Appbar = () => {
    return (
        <div className="border-b border-gray-700 flex justify-between px-10 py-3 h-16 bg-black">
            <div className="flex flex-col text-lg justify-center font-bold cursor-pointer">
                <Link to="/" className="flex items-center text-4xl font-bold text-white hover:text-gray-300 transition-colors">
                   <PiHandbagFill className="mr-2"/> Blogify
                </Link>
            </div>
            
            <div className="flex items-center space-x-4">
                <Link to="/GenerateyourthoughtswithAI">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-600 rounded transition-colors">
                        Generate with AI
                    </button>
                </Link>
                <Link to="/publish">
                    <button className="bg-transparent hover:bg-blue-600 text-blue-400 font-semibold
                     hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded transition-colors">
                        Write
                    </button>
                </Link>
                <ProfileBox />
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
                <div className="absolute -bottom-24 -left-16 shadow-lg p-4 bg-gray-900 border border-gray-700 z-50 w-[160px] rounded-md">
                    <div className="flex flex-col gap-3">
                        <div 
                            onClick={logout}
                            className="text-white hover:text-gray-300 cursor-pointer transition-colors"
                        >
                            Logout
                        </div>
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
            className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-700 hover:bg-gray-600 rounded-full cursor-pointer transition-colors"
        >
            <span className="font-medium text-white">
                {name.split(" ")?.[0]?.[0]}
                {name?.split(" ")?.[1]?.[0]}
            </span>
        </div>
    );
}

export default ProfileBox;



