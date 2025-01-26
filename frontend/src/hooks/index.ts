import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string
    }
}
export const useBlog =({ id }: { id: string }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || '',
                    },
                });
                console.log("Response:", response.data); 
                setBlog(response.data.blog); 
            } catch (error) {
                console.error("Failed to fetch blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);
 console.log("blog ", blog)
    return {
        loading,
        blog,
    };
};


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/getallposts`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                
                setBlogs(response.data.blogs);
               
                setLoading(false);
            })
            .catch(error =>{
                console.error("Failed to fetch blogs:",error);
                setLoading(false);
            })
    }, []);
    return {
        loading,
        blogs
    }
}