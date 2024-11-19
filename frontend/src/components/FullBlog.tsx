import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-9">
                <div className=" col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500">
                        Post on 2nd December 2024
                    </div>
                    <div className="">
                        {blog.content}
                    </div>
                </div>
                <div className=" col-span-4">
                    <div className="text-slate-500 text-lg">
                    Author

                    </div>
                   
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col jsutify-col">
                            <Avatar name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                            {blog.author.name || "Anonymous"}

                            </div>
                            <div className="pt-2 text-slate-500">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis atque vel commodi quas voluptas. 
                            </div>
                        </div>

                   

                    </div>
                  
                </div>
            </div>
        </div>
    </div>
    )
}