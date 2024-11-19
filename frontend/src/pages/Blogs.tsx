import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
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
        <div >
          {blogs.map(blog => 
          <BlogCard
            id={blog.id}            
            authorName={blog.author.name || "Swastika"}
            title={blog.title}
            content={blog.content}
            publishedDate={"17-11-2024"}
          />)}
        </div>
      </div>
    </div>
  )
}

