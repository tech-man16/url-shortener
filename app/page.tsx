'use client';


import React, { useEffect, useState } from "react";
import path from "path";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import confetti from "canvas-confetti";
import { Loader } from "@/components/loader";
import { myStyles } from "@/site/styles";
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
    setDummyUrl(s)
    if (s != "") {
      handleClick()
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
      setDummyUrl("Loading...");
      router.push(`/a?v=${url}`);
      setUrl("")
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
          <button className={myStyles.logoStyle} onClick={() => window.location.reload()}> URL Shortener Tool </button> {/* logoStyle*/}
        </nav>
        <div className="flex flex-1 flex-col justify-center items-center gap-2">
          <div className="flex gap-2">
            <input type="text" value={url} id="url" name="url"
              aria-label="Enter Url"
              placeholder="Enter Url..."
              //className="w-[250px] text-white outline-none border-4 bg-slate-400  border-purple-600 rounded-full hover:bg-slate-400/85 focus:pl-2 focus:tracking-widest focus:bg-slate-400/80"
              className={`${myStyles.inputStyle}`}
              onChange={(e: any) => { e.preventDefault(); setUrl(e.target.value) }}
              autoComplete="off"
            />
            <button
              disabled={isDisabled}
              className={!isDisabled ? myStyles.buttonStyle : myStyles.disablesButtonStyle}
              onClick={submit}
            >
              <span className="relative px-10 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-base h-full">
                {!isDisabled ? "Generate URL" : <Loader />}
              </span>
            </button>

          </div>
          {
            !dummyUrl.includes("Loading") && dummyUrl.length != 0 ?
              <a
                href={`${path.join(process.cwd(), `/getUrl?v=${dummyUrl}`)}`}
                className="mt-4 bg-gradient-to-r from-blue-500 to-lime-500 inline-block text-transparent bg-clip-text"
              >
                {`${window.location.origin}/getUrl?v=${dummyUrl}`}
              </a > :
              <span> {dummyUrl} </span>
          }
        </div >
      </div >
    </Suspense >
  );
}
