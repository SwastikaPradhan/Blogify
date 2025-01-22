import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Loading } from "../components/Loading";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams(); 
    const { loading, blog } = useBlog({ id: id || "" }); 

   //loading state handling
    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Loading />
                    </div>
                </div>
            </div>
        );
    }

   //if no blog is found
    if (!blog) {
        return (
            <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="text-center text-gray-500">
                        Blog not found. Please try again.
                    </div>
                </div>
            </div>
        );
    }

   //blog is found
   return (
    <div>
        <FullBlog 
            content={blog.content}
            title={blog.title}
            author={blog.author}
            id={blog.id}
        />
    </div>
);
};
