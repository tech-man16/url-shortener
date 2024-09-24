'use client';


import React, { useEffect, useState } from "react";
import path from "path";
import { useRouter, useSearchParams } from "next/navigation";
import ReactCanvasConfetti from 'react-canvas-confetti';
import confetti from "canvas-confetti";

// https://www.leetcode.com 

export const fetchCache = "force-no-store";
export const dynamic = 'force-static';

export default function Home() {
  const [url, setUrl] = useState("")
  const [dummyUrl, setDummyUrl] = useState("")
  const query = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setDummyUrl("");
    router.push("/");

  }, []);

  useEffect(() => {
    const s = query.get("short_url") || "";
    setDummyUrl(s)
    if (s != "") handleClick()
  }, [query]);

  const handleClick = () => {
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.5 },
    });
  };

  const submit = () => {

    if (url !== "") {
      setDummyUrl("Loading...");
      router.push(`/a?v=${url}`);
      setUrl("")
    }
    else {
      alert("No link Recieved !!");
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex">
        <button className="text-2xl p-10 bg-gradient-to-r from-blue-500 to-orange-500 inline-block text-transparent bg-clip-text drop-shadow-2xl" onClick={() => window.location.reload()}> URL Shortener Tool </button>
      </nav>
      <div className="flex flex-1 flex-col justify-center items-center gap-2">
        <div className="flex gap-2">


          <input type="text" value={url} id="url" name="url"
            aria-label="Enter Url"
            placeholder="Enter Url..."
            //className="w-[250px] text-white outline-none border-4 bg-slate-400  border-purple-600 rounded-full hover:bg-slate-400/85 focus:pl-2 focus:tracking-widest focus:bg-slate-400/80"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 tracking-[0.25rem] block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e: any) => { e.preventDefault(); setUrl(e.target.value) }}
          />



          <button
            className="relative inline-flex items-stretch justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            onClick={submit}
          >
            <span className="relative px-10 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-base h-full">
              Generate URL
            </span>
          </button>
        </div>


        {!dummyUrl.includes("Loading") && dummyUrl.length != 0 ?
          <a
            href={`${path.join(process.cwd(), `/getUrl?v=${dummyUrl}`)}`}
            className="mt-4 bg-gradient-to-r from-blue-500 to-lime-500 inline-block text-transparent bg-clip-text"
          >
            {`${window.location.origin}/getUrl?v=${dummyUrl}`}

          </a> :
          <span> {dummyUrl} </span>
        }


      </div>
    </div>
  );
}
