import Head from "next/head";
import React from "react";
import AdminHeader from "./Header";
import AdminSideBar from "./SideBar";
export default function AdminTheme(props) {
  return (
    <div className="h-full w-full bg-gray-200">
      <Head>
        <title>Amazon | Admin</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AdminHeader />
      <div className="flex flex-col md:flex-row">
        <div className="fixed bottom-0 z-50 w-full content-center md:relative md:h-auto md:min-h-screen md:max-w-[200px]">
          <AdminSideBar />
        </div>

        <div className="h-screen w-full p-1 pb-20 sm:h-full sm:p-2 md:p-3 md:pb-0 lg:p-4 xl:p-5">
          {props.children}
        </div>
      </div>
    </div>
  );
}
