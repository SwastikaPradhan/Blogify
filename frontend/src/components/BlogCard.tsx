import { Link } from "react-router-dom"

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border border-gray-700 rounded shadow w-screen max-w-screen-md cursor-pointer bg-black hover:bg-gray-900 transition-colors duration-200">
        <div className="flex items-center mb-2">
          <Avatar name={authorName} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col text-white">{authorName}</div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-gray-400 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <div className="text-md font-thin text-gray-300">{content.slice(0, 100) + "..."}</div>
        <div className="text-sm text-gray-400 font-thin pt-4">
          {`${Math.ceil(content.length / 100)} minutes read`}
        </div>
       </div>
    </Link>
   );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-gray-400">
  </div>
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-green-400">
      <span className="font-medium text-black">
        {name[0]}{name[1]}
       </span>
    </div>
  );
}