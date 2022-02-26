import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../../../firebase/firebase";
import { FaUserCircle } from "react-icons/fa";

export default function AdminHeader() {
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.emailVerified) {
          router.push("/admin/login/emailverification");
        }
      } else {
        router.push("/admin/login");
      }
    });
  }, [auth.currentUser]);

  return (
    <div>
      <div className="sticky top-0">
        <div className="flex flex-grow items-center bg-[#131921] p-1 py-2">
          <div className="mt-2 flex flex-grow items-center sm:flex-grow-0">
            <Image
              onClick={() => router.push("/admin")}
              src="/AmazonWhite.png"
              width={150}
              height={40}
              objectFit="contain"
              className="cursor-pointer"
            />
          </div>

          {/* search */}
          <div className="hidden h-10 flex-grow sm:flex  "></div>

          {/* right */}
          <div className="mx-6 flex items-center  space-x-6 whitespace-nowrap text-white">
            {user ? (
              <div
                className=" group relative"
                onClick={() => router.push("/admin/profile")}
              >
                {!user.photoURL ? (
                  <FaUserCircle className="h-8 w-8 cursor-pointer" />
                ) : (
                  <img
                    className="h-6 w-6 cursor-pointer rounded-full"
                    src={`${user.photoURL}`}
                  />
                )}
                <p className=" absolute -right-6 mt-0.5 scale-0 rounded-md bg-black/80 px-2 py-0.5 capitalize transition-all duration-300 ease-in-out group-hover:scale-100">
                  {user?.displayName}
                </p>
              </div>
            ) : (
              <p
                className="cursor-pointer"
                onClick={() => router.push("/admin/login")}
              >
                Login
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
