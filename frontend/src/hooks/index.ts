import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string
    }
}

//hook for fetching single blog
export const useBlog = ({ id }: { id: string }) => {
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

    return {
        loading,
        blog,
    };
};
//hook for fetching all blogs
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`${BACKEND_URL}/api/v1/blog/getallposts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch blogs:", error);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs
    }
}
// Hook for updating a blog post
export const useUpdateBlog = () => {
  const [loading, setLoading] = useState(false);

  const updateBlogPost = async (
    blogId: string,
    updateData: { title: string; content: string }
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog/update/${blogId}`,
        {
          title: updateData.title,
          content: updateData.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update blog:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateBlogPost, loading };
};
//deleteblog
export const useDeleteBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deleteBlog = async (blogId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/blog/delete/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      console.error("Failed to delete blog:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteBlog, loading };
};