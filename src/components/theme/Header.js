import Image from "next/image";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart, HiX } from "react-icons/hi";
import { useRouter } from "next/dist/client/router";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Header() {
  const [active, setActive] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [Category, setCategory] = useState();
  const [Cart, setCart] = useState();
  const [keyword, setKeyword] = useState(null);

  useEffect(
    () =>
      onSnapshot(
        collection(db, "users", `${session?.user.email}`, "cart"),
        (snapshot) => setCart(snapshot.docs)
      ),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "categories"), (snapshot) =>
        setCategory(snapshot.docs)
      ),
    [db]
  );
  const handleClick = () => {
    setActive(!active);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      router.push(`/search/${keyword}`);
    }
  };
  return (
    <>
      {/* Side bar */}
      <div
        className={`${
          active ? "" : "hidden"
        } fixed z-50 flex h-full w-full bg-black bg-opacity-70`}
      >
        <Slide left>
          <div className="scrollbar-hide h-full w-full overflow-y-scroll bg-white md:w-[365px]">
            <div
              onClick={() =>
                !session ? router.push("/auth/signin") : router.push("/me")
              }
              className="sticky top-0 flex cursor-pointer items-center space-x-2 bg-[#232f3e] py-2 px-7 text-xl font-bold capitalize text-white"
            >
              {session ? (
                <img
                  src={session.user.image}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <FaUserCircle className="h-8 w-8" />
              )}
              <p>
                {session ? `Hello, ${session.user.name}` : "Hello, Sign In"}
              </p>
            </div>

            <div className="my-3 border-b border-gray-300 px-7 pb-5 capitalize">
              <h3 className="my-1.5 text-lg font-bold text-gray-900">
                Trending
              </h3>{" "}
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <p className="sidebar_sub_items">Best Sellers</p>
                <p className="sidebar_sub_items">New Releases</p>
                <p className="sidebar_sub_items">Movers and Shakers</p>
              </div>
            </div>

            <div className="my-3 border-b border-gray-300 px-7 pb-5 capitalize">
              <h3 className="my-1.5 text-lg font-bold text-gray-900">
                shop by department
              </h3>{" "}
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                {Category?.map((category, index) => (
                  <p
                    key={index}
                    className="sidebar_sub_items"
                    onClick={() =>
                      router.push(`/category/${category.data().name}`)
                    }
                  >
                    {category.data().name}
                  </p>
                ))}
              </div>
            </div>

            <div className="my-3 border-b border-gray-300 px-7 pb-5 capitalize">
              <h3 className="my-1.5 text-lg font-bold text-gray-900">
                digital content and devices
              </h3>{" "}
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <p className="sidebar_sub_items">Echo & Alexa</p>
                <p className="sidebar_sub_items">Fire TV</p>
                <p className="sidebar_sub_items">Kindle E-Readers & eBooks</p>
                <p className="sidebar_sub_items">Audible Audiobooks</p>
                <p className="sidebar_sub_items">Amazon Prime Video</p>
                <p className="sidebar_sub_items">Amazon Prime Music</p>
              </div>
            </div>

            <div className="my-3 border-b border-gray-300 px-7 pb-5 capitalize">
              <h3 className="my-1.5 text-lg font-bold text-gray-900">
                Programs & Features{" "}
              </h3>{" "}
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <p className="sidebar_sub_items">
                  Gift Cards & Mobile Recharges
                </p>
                <p className="sidebar_sub_items">Kindle E-Readers & eBooks</p>
                <p className="sidebar_sub_items">Flight Tickets</p>
                <p className="sidebar_sub_items">#FoundItOnAmazon</p>
              </div>
            </div>

            <div className="my-3 border-b border-gray-300 px-7 pb-5 capitalize">
              <h3 className="my-1.5 text-lg font-bold text-gray-900">
                help & settings{" "}
              </h3>{" "}
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <p
                  className="sidebar_sub_items"
                  onClick={() => router.push(`/me`)}
                >
                  Your Account
                </p>
                <p className="sidebar_sub_items">Customer Service</p>
                <p
                  onClick={() =>
                    !session ? router.push("/auth/signin") : signOut()
                  }
                  className="sidebar_sub_items"
                >
                  {!session ? "Sign In" : "Logout"}
                </p>
              </div>
            </div>
          </div>
        </Slide>
        <div className="flex-grow text-white" onClick={handleClick}>
          <Fade>
            <HiX className="mt-3 h-8 w-8 cursor-pointer" />
          </Fade>
        </div>
      </div>

      {/* Top Bar */}
      <div className="sticky top-0 z-40">
        <div className="flex flex-grow items-center bg-[#131921] p-1 py-2">
          <div className="mt-2 flex flex-grow items-center sm:flex-grow-0">
            <Image
              onClick={() => router.push("/")}
              src="/AmazonWhite.png"
              width={150}
              height={40}
              objectFit="contain"
              className="cursor-pointer"
            />
          </div>

          {/* search */}
          <form
            onSubmit={handleSearch}
            className="relative hidden h-10 flex-grow cursor-pointer items-center rounded-md bg-yellow-400 hover:bg-yellow-500 sm:flex"
          >
            <input
              onChange={(e) => setKeyword(e.target.value.trim().toLowerCase())}
              className="h-full w-6 flex-shrink flex-grow rounded-l-md p-2 focus:outline-none"
              placeholder="Search Products by Title OR Category "
              type="text"
            />
            <FaSearch onClick={() => handleSearch} className="h-12 w-12 px-4" />
          </form>

          {/* right */}
          <div className="mx-6 flex items-center space-x-6 whitespace-nowrap text-xs text-white">
            <div className="link group hidden md:inline-block">
              <p className="capitalize">
                {session ? `Hello, ${session.user.name}` : "Hello, Sign In"}
              </p>

              <p className="font-extrabold md:text-sm">Account & Lists</p>
              {/* Hover Menu */}

              <div className="absolute right-5 hidden shadow-2xl group-hover:block">
                <div className="flex w-full justify-center overflow-hidden">
                  <div className=" h-3 w-3 origin-bottom-left rotate-45 transform bg-white"></div>
                </div>
                <div className="w-full rounded-md bg-white py-5 px-10 text-black">
                  {session ? (
                    ""
                  ) : (
                    <button
                      className="amazon_button mx-auto flex justify-center px-10"
                      onClick={() => router.push("/auth/signin")}
                    >
                      Sign In
                    </button>
                  )}
                  <div className="mt-3 flex flex-wrap justify-around gap-x-5">
                    <div>
                      <h3 className="mb-2.5 border-b border-gray-300 text-lg font-bold">
                        Your Lists
                      </h3>
                      <div className="flex flex-col gap-y-1 text-sm">
                        <p className="hover:text-yellow-500 hover:underline">
                          Create a Wish List{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Wish from Any Website{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Baby Wish List{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Discover Your Style{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Explore Showroom
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2.5 border-b border-gray-300 text-lg font-bold">
                        Your Account
                      </h3>
                      <div className="flex flex-col gap-y-1 text-sm">
                        <p
                          className="hover:text-yellow-500 hover:underline"
                          onClick={() => router.push(`/me`)}
                        >
                          Your Account{" "}
                        </p>
                        <p
                          className="hover:text-yellow-500 hover:underline"
                          onClick={() => router.push("/orders")}
                        >
                          Your Orders{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Your Wish List{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Your Recommendations
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Your Prime Membership{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Your Prime Video{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Your Subscribe & Save
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Items Memberships & Subscriptions{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Your Gift Card Balance
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Your Amazon Business Account{" "}
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Your Seller Account Manage
                        </p>
                        <p className="hover:text-yellow-500 hover:underline">
                          Your Content and Devices
                        </p>
                        {session ? (
                          <p
                            onClick={signOut}
                            className="mt-4 border-t border-gray-300 pt-1 hover:text-yellow-500 hover:underline"
                          >
                            SignOut
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="link" onClick={() => router.push("/orders")}>
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">& orders</p>
            </div>
            <div
              onClick={() => router.push("/cart")}
              className="link relative flex cursor-pointer items-center"
            >
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-yellow-400 text-center font-bold text-black md:right-7">
                {Cart?.length}
              </span>
              <HiOutlineShoppingCart className="h-10 w-10" />
              <p className="mt-2 hidden font-extrabold md:inline md:text-sm">
                Cart
              </p>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="flex items-center space-x-3 bg-[#232F3E] p-2 pl-6 text-sm text-white">
          <p className="link flex items-center" onClick={handleClick}>
            <FaBars className="flex-n mr-1 h-5 w-5" />
            <span className="hidden sm:inline-flex">All</span>
          </p>
          <p className="link" onClick={() => router.push(`/category`)}>
            Categories
          </p>
          <p className="link">Amazon Business</p>
          <p className="link">Today&apos;s Deals</p>
          <p className="link hidden lg:inline-flex">Electronics</p>
          <p className="link hidden lg:inline-flex">Food & Grocery</p>
          <p className="link hidden lg:inline-flex">Prime</p>
          <p className="link hidden lg:inline-flex">Buy Again</p>
          <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
          <p className="link hidden lg:inline-flex">Health & Persoal Care</p>
        </div>
      </div>
    </>
  );
}
