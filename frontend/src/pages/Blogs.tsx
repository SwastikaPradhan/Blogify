import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const publishedDateString = new Date(Date.now()).toLocaleDateString("en-US");
  if (loading) {
    return <div>
      <Appbar/>
      <div className="flex justify-center">
        <div>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        </div>
      </div>     
    </div>
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map(blog => 
          <BlogCard
            id={String(blog.id)}            
            authorName={blog.author.name || "Swastika"}
            title={blog.title || "Untitled"}
            content={blog.content || "No content avaiable"}
            publishedDate={publishedDateString}
          />)}
        </div>
      </div>
    </div>
  )
}

