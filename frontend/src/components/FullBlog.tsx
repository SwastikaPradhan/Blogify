import { useState } from "react";
import { Appbar } from "./Appbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { RichTextEditor } from "./edit";

interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const FullBlog = ({ author, content, title}: Blog) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: call update API here
      // await updateBlog(id, { title: editedTitle, content: editedContent });
      
      setIsEditing(false);
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error("Failed to update post!");
      console.error("Error updating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );
    
    if (!confirmed) return;

    setIsLoading(true);
    try {
      toast.success("Post deleted successfully!");
      navigate("/blog");
    } catch (err) {
      toast.error("Failed to delete post!");
      console.error("Error deleting blog:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Appbar />
      <div className="flex justify-center px-6 py-8">
        <div className="w-full max-w-5xl">
          {/* Header Section */}
          <header className="mb-8">
            <div className="flex justify-between items-start mb-6">
              {isEditing ? (
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={handleTitleKeyDown}
                  className="flex-1 text-4xl font-bold bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 mr-6 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400"
                  placeholder="Enter blog title..."
                  disabled={isLoading}
                />
              ) : (
                <h1 className="flex-1 text-4xl font-bold text-white leading-tight mr-6">
                  {editedTitle}
                </h1>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3 flex-shrink-0">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isLoading || !editedTitle.trim()}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg"
                  >
                    Edit Post
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
            
            {/* Author Info */}
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                {author.name.charAt(0).toUpperCase()}
              </div>
              <span>By {author.name}</span>
              <span className="mx-2">•</span>
              <span className="text-gray-400">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </header>

          {/* Content Section */}
          <article className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
            {isEditing ? (
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content
                  </label>
                  <RichTextEditor
                    value={editedContent}
                    onChange={setEditedContent}
                    placeholder="Start writing your blog content..."
                    className="w-full"
                  />
                </div>
                
                {/* Editor Help Text */}
                <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Editor Tips:</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Use the toolbar above to format your text</li>
                    <li>• Press Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline</li>
                    <li>• Click the eye icon to preview your content</li>
                    <li>• Use headings to structure your blog post</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="prose prose-lg prose-invert max-w-none">
                  <div 
                    className="text-gray-100 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: editedContent }}
                  />
                </div>
              </div>
            )}
          </article>

          {/* Blog Stats (optional) */}
          {!isEditing && (
            <div className="mt-6 flex items-center justify-between text-sm text-gray-400 border-t border-gray-800 pt-6">
              <div className="flex items-center gap-6">
                <span>
                  {editedContent.replace(/<[^>]*>/g, '').split(/\s+/).length} words
                </span>
                <span>
                  {Math.ceil(editedContent.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)} min read
                </span>
              </div>
              <div className="text-xs">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};