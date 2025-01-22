import { Appbar } from "./Appbar";
//import axios from "axios";
//import { useState } from "react";
import { Avatar } from "./BlogCard";
//import { TRANSLATE_KEY } from '../pages/config';

interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const FullBlog = ({ author, id, content, title }: Blog) => {
 

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-9">
          <article className="col-span-8">
            <header>
              <div className="text-3xl font-extrabold">{title}</div>
              <div className="text-slate-500">Posted on 2nd December</div>
            </header>
            <div>{content}</div>
          </article>
          <aside className="col-span-4">
            <div className="text-slate-500 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-start">
                <Avatar name={author?.name || "Anonymous"} />
              </div>
              <div className="flex flex-col justify-start">
               
                <p className="mt-4 text-gray-500">{content}</p>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">
                {author?.name || "Anonymous"}
              </div>
              <div className="pt-2 text-slate-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                atque vel commodi quas voluptas.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

