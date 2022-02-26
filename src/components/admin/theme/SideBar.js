import { useRouter } from "next/router";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaUsers, FaProductHunt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

export default function AdminSideBar() {
  const router = useRouter();
  return (
    <div className="flex h-full w-full items-center justify-around divide-yellow-300/50 bg-[#131921] p-1 text-white md:w-auto md:flex-col md:justify-start md:space-y-2 md:divide-y md:px-3 md:pt-5">
      <div className="adminsidebarlink" onClick={() => router.push("/admin")}>
        <AiFillHome className="h-6 w-6" />
        <p className=" font-semibold">Home</p>
      </div>
      <div
        className="adminsidebarlink"
        onClick={() => router.push("/admin/products")}
      >
        <FaProductHunt className="h-6 w-6" />
        <p className=" font-semibold">Products</p>
      </div>
      <div className="adminsidebarlink">
        <FaUsers className="h-6 w-6" />
        <p className=" font-semibold">Users</p>
      </div>
      <div
        className="adminsidebarlink"
        onClick={() => router.push("/admin/category")}
      >
        <BiCategory className="h-6 w-6" />
        <p className=" font-semibold">Category</p>
      </div>
    </div>
  );
}
