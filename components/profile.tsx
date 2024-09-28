
import React from "react";

import profile from "@/images/profile.jpg";
import profile2 from "@/images/profile.jpg";
import Image from "next/image";

const Profile = (props: any) => {

    return (
        <div className="sm:relative flex h-full w-full sm:flex-col min-w-[370px] max-h-[352px] bg-gradient-to-br from-cyan-700/30 to-yellow-500 p-2">
            <main className="sm:relative flex h-full w-full sm:flex-col bg-gradient-to-br from-yellow-500 via-blue-400/75 to-yellow-500/30">

                <div className={`hidden sm:flex w-full max-w-screen-2xl flex-1 bg-sky-800 h-1/8 ${props.name ? "order-1" : "order-3"} sm:order-1 border-2`}> </div>
                <div className="flex flex-col my-2 justify-center items-center w-full order-2 gap-3 text-lg sm:h-2/3 sm:min-h-[220px] sm:p-4  max-[640px]:flex-1 max-sm:border-l-4">

                    <span className="text-black sm:mt-16">
                        {props.name ? "Meenal Shrivastava" : "Manas Maheshwari"}
                    </span>

                    <span className="bg-gradient-to-r from-green-800 via-black to-green-950 text-transparent bg-clip-text font-semibold"> Developer  </span>
                    <span className="flex gap-5 sm:gap-20 bg-gradient-to-br from-pink-400 via-green-100 to-yellow-200 text-transparent bg-clip-text">
                        <a href="#" className="flex hover:w-12 hover:h-12">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full  fill-black hover:fill-black/75" viewBox="0 0 50 50" width={38} height={38}>
                                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" />
                            </svg>
                        </a>
                        <a href="https://github.com/tech-man16/url-shortener" className="flex hover:h-12 hover:w-12"> <svg
                            height={40}
                            viewBox="0 0 24 24"
                            width={40}
                            className="h-full w-full fill-black hover:fill-black/75"
                        >
                            <path
                                clipRule="evenodd"
                                d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                                fillRule="evenodd"
                            />
                        </svg> </a>
                    </span>
                </div>

                <div className={`flex max-[640px]:justify-center max-[640px]:items-center max-[640px]:flex-1 ${props.name ? "order-3" : "order-1"}`}>
                    <span className={`flex flex-initial p-2 w-[150px] h-[150px] my-auto border-4 rounded-full justify-center items-center  sm:order-3 
            sm:absolute sm:h-[150px] sm:w-[150px] sm:top-[10%] sm:left-0 sm:right-0 sm:mx-auto sm:my-0 sm:border-8 bg-white sm:rounded-full hover:border-green-400`}>
                        <Image
                            src={props.name ? profile2.src : profile.src}
                            className="flex rounded-full h-full w-full sm:h-full sm:w-full"
                            alt="Developer's side"
                            width={100}
                            height={100}
                        />
                    </span>
                </div>
            </main >
        </div>
    )
}

export default Profile;