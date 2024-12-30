import { Appbar } from "./Appbar";
import axios from "axios";
import { useState } from "react";
import { Avatar } from "./BlogCard";
import {TRANSLATE_KEY} from '../pages/config';

interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const FullBlog = ({ author, id, content, title }: Blog) => {
  const [language, setLanguage] = useState<string>("en");
  const [translation, setTranslation] = useState<string>("");
 

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
  ];

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const translateText = async () => {
    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "x-rapidapi-key": TRANSLATE_KEY,
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
      },
      data: new URLSearchParams({
        q: content,
        target: language,
      }),
    };

    try {
      const response = await axios.request(options);
      setTranslation(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error("Error during translation:", error);
    }
  };

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
            <div>{translation || content}</div>
          </article>
          <aside className="col-span-4">
            <div className="text-slate-500 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-start">
                <Avatar name={author?.name || "Anonymous"} />
              </div>
              <div className="flex flex-col justify-start">
                <div>
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="border p-2 rounded"
                  >
                    {languages.map((language) => (
                      <option key={language.code} value={language.code}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={translateText}
                    className="bg-blue-500 text-white p-2 rounded ml-2"
                  >
                    Translate
                  </button>
                </div>
                <p className="mt-4 text-gray-500">{translation || content}</p>
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

