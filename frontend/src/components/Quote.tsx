export const Quote = () => {
    return <div className="bg-black h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="max-w-lg relative">
                {/* Animated border box */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-lg p-0.5 animate-pulse">
                    <div className="bg-black rounded-lg h-full w-full"></div>
                </div>
                
                {/* Moving light effect */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full opacity-70 animate-bounce"></div>
                    <div className="absolute top-1/2 -right-2 w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-ping"></div>
                    <div className="absolute -bottom-2 left-1/3 w-2 h-2 bg-pink-400 rounded-full opacity-80 animate-pulse"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 bg-gradient-to-br from-gray-900/50 to-black/50 
                rounded-lg backdrop-blur-sm border border-gray-700/30">
                    <div className="text-3xl text-cyan-50 font-bold">
                        "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                    </div>
                    <div className="max-w-md text-xl text-cyan-50 font-semibold mt-4">
                        Jules Winnfield
                    </div>
                    <div className="max-w-md text-xl text-cyan-50 font-semibold mt-4">
                        CEO, Acme Inc
                    </div>
                </div>
            </div>
        </div>
    </div>
}