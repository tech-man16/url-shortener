'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import confetti from "canvas-confetti";
import { Loader } from "@/components/loader";
import Profile from "@/components/profile";

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
    if (s.startsWith("Internal")) {
      setDummyUrl("");
      setDisabled(false);
    }

    else if (s != "") {
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

  const copyToClipboard = async () => {
    try {
      if (dummyUrl.length != 0)
        await navigator.clipboard.writeText(`${window.location.origin}/${dummyUrl}`), alert("Copied to clipboard !!");
      else
        alert("Not a valid url !!");
    } catch (e) {
      alert("Copy failed..");
    }
  }

  const submit = () => {
    setDisabled(true);
    if (url !== "") {
      if (url.split(".").length != 3 || url.startsWith(".") || url.includes(" ")) {
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
          <button className={"text-2xl p-10 bg-gradient-to-r from-white to-orange-500 inline-block text-transparent bg-clip-text drop-shadow-2xl font-extrabold"} onClick={() => { setDummyUrl(""), window.location.reload() }}> URL Shortener Tool </button>
        </nav>
        <div className="flex justify-around max-sm:flex-col-reverse max-sm:gap-8 min-[1000px]:h-1/3 min-[1000px]:min-h-[200px]">
          <div className="flex flex-col justify-center items-center gap-4 flex-1">
            <div className="flex justify-center items-center gap-2 flex-col lg:flex-row p-2.5">
              <input type="text" value={url} id="url" name="url"
                aria-label="Enter Url"
                placeholder="Enter Url..."
                className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 tracking-[0.25rem] block w-80 sm:w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:outline-4 dark:focus:outline-yellow-500"}
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
                <span className="relative px-10 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-base h-full w-full">

                  {!isDisabled ? "Generate URL" : <span className="text-white"> Generating.. <Loader /> </span>}

                </span>
              </button>
            </div>
            {
              !dummyUrl.includes("Loading") && dummyUrl.length != 0 ?
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 justify-between">
                    <a href={`${window.location.origin}/${dummyUrl}`}
                      className="flex justify-center items-center bg-gradient-to-r from-pink-950 via-red-950 to-green-900 text-transparent bg-clip-text text-xl font-extrabold"
                    > {`${window.location.origin}/${dummyUrl}`}
                    </a >
                    <button className="w-32 h-12 relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 via-blue-400 to-pink-500 hover:from-purple-500/85 hover:via-blue-400/85 hover:to-pink-500/85 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" onClick={copyToClipboard}>  Copy  </button>
                  </div>
                  <span className="mt-4 bg-gradient-to-br from-black via-blue-500 to-purple-900 flex flex-row-reverse text-transparent bg-clip-text text-sm font-extrabold"> Valid for 24 hours </span>
                </div> :
                <span> {dummyUrl} </span>
            }
          </div >
          <div className="flex flex-col mr-16 gap-2 justify-center items-center">
            <p
              className="text-xl flex w-full pl-10 bg-gradient-to-r from-white via-yellow-800 to-black  font-extrabold sm:from-black sm:via-green-900 sm:to-blue-500 text-transparent bg-clip-text sm:text-2xl sm:pl-0  ">
              Accepted Urls:
            </p>
            <div className="flex flex-row-reverse gap-2 w-full pl-20 max-[640px]:flex-row max-[640px]:pl-20 text-base">
              <div className="flex flex-col bg-gradient-to-r from-black via-purple-600 to-black text-transparent bg-clip-text text-lg">
                <span className="flex py-1"> www.example.com </span>
                <span className="flex" >https://www.example.com   </span>
                <span className="flex">   example.com</span>
              </div>
              <div className="flex flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className="size-8 fill-green-700 stroke-slate-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className="size-8 fill-green-700 stroke-slate-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.8" className="size-8 stroke-slate-300 fill-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 5.5 5.8m0-5.8-5.5 5.5M22 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>

            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center sm:min-h-[352px] h-2/3">
          <Profile name={0} />
          <div className="flex flex-1 w-full justify-center items-center text-black font-semibold text-xl"> Developed by #MM &nbsp;
            <span className="bg-gradient-to-tr from-red-800 via-green-900 to-emerald-500 text-transparent bg-clip-text"> &copy;MM </span>
          </div>
        </div>
      </div >
    </Suspense >
  );
}
