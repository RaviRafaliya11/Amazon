import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { MdEmail } from "react-icons/md";
import MainTheme from "../components/theme/MainTheme";
import { Zoom } from "react-reveal";

export default function UserProfile() {
  const { data: session } = useSession();
  return (
    <MainTheme>
      {session ? (
        <Zoom>
          <div className="mx-auto my-20 flex h-auto max-w-4xl flex-wrap items-center lg:my-0 lg:h-screen">
            <div className="mx-3 w-full rounded-lg bg-white opacity-75 shadow-2xl lg:mx-0 lg:flex lg:w-3/5 lg:rounded-lg">
              <div className="p-4 text-center md:p-12 lg:text-left">
                <img
                  src={session?.user?.image}
                  alt=" "
                  className="mx-auto -mt-16 block h-40 w-40 rounded-full bg-cover bg-center shadow-xl lg:hidden"
                />
                <h1 className="pt-8 text-3xl font-bold capitalize text-black lg:pt-0">
                  {session?.user?.name}
                </h1>
                <div className="mx-auto w-4/5 border-b-2 border-yellow-500 pt-3 opacity-25 lg:mx-0"></div>
                <p className="flex items-center justify-center pt-4 text-xs text-gray-600 lg:justify-start lg:text-sm">
                  <MdEmail className="mr-2 h-5 w-5" />
                  {session?.user?.email}
                </p>
                <p className="pt-8 text-sm">Thankyou for Joining Amazon.</p>
                <div className="pt-12 pb-8">
                  <button
                    onClick={signOut}
                    className="group relative inline-flex items-center  justify-start overflow-hidden rounded bg-[#FF9900] px-5 py-3 font-bold"
                  >
                    <span className="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-black opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                      Signout
                    </span>
                  </button>
                </div>
              </div>
              <img
                src={session?.user?.image}
                alt=" "
                className="mx-auto -mt-16 hidden h-40 w-40 rounded-full bg-cover bg-center shadow-xl lg:block"
              />
            </div>
          </div>
        </Zoom>
      ) : (
        <div className="flex flex-col items-center pt-40">
          <p className="mb-5 text-xl">Please Sign in to view Profile.</p>
          <button
            onClick={signIn}
            className="group relative inline-flex items-center justify-start overflow-hidden rounded-md bg-yellow-500 px-9 py-3 font-medium transition-all"
          >
            <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded bg-yellow-700 transition-all duration-500 ease-in-out group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 h-5 w-5 translate-x-1/2 -translate-y-1/2 rotate-45 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 h-full w-full -translate-x-full translate-y-full rounded-md bg-yellow-600 transition-all delay-200 duration-500 ease-in-out group-hover:mb-12 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Sign in
            </span>
          </button>
        </div>
      )}
    </MainTheme>
  );
}
