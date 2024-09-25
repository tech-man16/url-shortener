'use client';


import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import confetti from "canvas-confetti";
import { Loader } from "@/components/loader";

// https://www.leetcode.com 

export const fetchCache = "force-no-store";
export const dynamic = 'force-static';

export default function Home() {
  const [url, setUrl] = useState("");
  const [dummyUrl, setDummyUrl] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const query = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setDummyUrl("");
    router.push("/");
    setDisabled(false);

  }, []);

  useEffect(() => {
    const s = query.get("short_url") || "";
    setDummyUrl(s);
    if (s != "") {
      handleClick();
      setDisabled(false);
    }
  }, [query]);

  const handleClick = () => {
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.5 },
    });
  };

  const submit = () => {
    setDisabled(true);
    if (url !== "") {
      if (url.split(".").length != 3) {
        alert("Invalid url");
        setDisabled(false);
      }
      else {
        setDummyUrl("Loading...");
        router.push(`/a?v=${url}`);
        setUrl("")
      }
    }
    else {
      alert("No link Recieved !!");
      setDisabled(false);
    }
  }

  return (
    <Suspense>
      <div className="flex flex-col h-screen">
        <nav className="flex">
          <button className={"text-2xl p-10 bg-gradient-to-r from-blue-500 to-orange-500 inline-block text-transparent bg-clip-text drop-shadow-2xl"} onClick={() => { setDummyUrl(""), window.location.reload() }}> URL Shortener Tool </button>
        </nav>
        <div className="flex flex-1 flex-col justify-center items-center gap-2">
          <div className="flex gap-2">
            <input type="text" value={url} id="url" name="url"
              aria-label="Enter Url"
              placeholder="Enter Url..."
              className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 tracking-[0.25rem] block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"}
              onChange={(e: any) => { e.preventDefault(); setUrl(e.target.value) }}
              autoComplete="off"
            />
            <button
              disabled={isDisabled}
              className={!isDisabled ?
                "relative inline-flex items-stretch justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" :
                "relative inline-flex items-stretch justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-purple-500 to-pink-500"}
              onClick={submit}
            >
              <span className="relative px-10 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-base h-full">
                {!isDisabled ? "Generate URL" : <Loader />}
              </span>
            </button>
          </div>
          {
            !dummyUrl.includes("Loading") && dummyUrl.length != 0 ?
              <div className="flex flex-col gap-4">
                <a href={`${window.location.origin}/${dummyUrl}`}
                  className="mt-4 bg-gradient-to-r from-pink-500 to-lime-500 inline-block text-transparent bg-clip-text text-2xl font-extrabold"
                >
                  {`${window.location.origin}/${dummyUrl}`}
                </a >

                <span className="mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-white flex flex-row-reverse text-transparent bg-clip-text text-sm font-extrabold"> Valid for 10 seconds </span>
              </div> :
              <span> {dummyUrl} </span>
          }
        </div >
      </div >
    </Suspense >
  );
}
