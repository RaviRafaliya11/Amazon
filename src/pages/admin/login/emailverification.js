import AdminHeader from "../../../components/admin/theme/Header";
import { auth } from "../../../firebase/firebase";
import { sendEmailVerification, signOut } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countdown from "react-countdown";

export default function EmailVerification() {
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    if (loading) return;
    setLoading(true);
    await sendEmailVerification(auth.currentUser).then(
      toast.success("Email Sent", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      })
    );
    setTimeout(() => {
      signOut(auth);
    }, 7000);
  };
  return (
    <div>
      <ToastContainer />
      <AdminHeader />
      <div className="flex h-screen flex-col items-center gap-10 bg-gray-200">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-3 pt-10">
          <Image
            src={`/AmazonBlack.svg`}
            className="absolute"
            width={400}
            height={50}
            objectFit="contain"
          />
          <h1 className="font text-3xl font-bold">
            Hello {user?.displayName ? user.displayName : "User"}!
          </h1>
          <h2>
            You registered an account on Amazon, before being able to use our
            services you need to verify that{" "}
            <span className="font-semibold underline">{user?.email}</span> is
            your email address.
          </h2>
          <h2>Please click on the button below to send verification email.</h2>

          <buton
            onClick={sendEmail}
            class="group relative my-5 max-w-max cursor-pointer overflow-hidden rounded-lg border border-gray-100 bg-[#FF9900] px-5 py-3 font-medium text-white shadow-inner"
          >
            <span class="ease absolute top-0 left-0 h-0 w-0 border-t-2 border-gray-600 transition-all duration-200 group-hover:w-full"></span>
            <span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-gray-600 transition-all duration-200 group-hover:w-full"></span>
            <span class="ease absolute top-0 left-0 h-0 w-full bg-gray-600 transition-all delay-200 duration-300 group-hover:h-full"></span>
            <span class="ease absolute bottom-0 left-0 h-0 w-full bg-gray-600 transition-all delay-200 duration-300 group-hover:h-full"></span>
            <span class="absolute inset-0 h-full w-full bg-gray-900 opacity-0 delay-300 duration-300 group-hover:opacity-100"></span>
            <span class="ease relative transition-colors delay-200 duration-300">
              {loading ? "Check Your Inbox" : "Send Email"}
            </span>
          </buton>

          <p className="font-semibold">Thanks, Amazon.</p>
        </div>

        {loading && (
          <p>
            You will be automatically Logout in {"  "}
            <Countdown
              date={Date.now() + 7000}
              intervalDelay={0}
              renderer={({ seconds }) => {
                return <span>0{seconds} seconds.</span>;
              }}
            ></Countdown>
          </p>
        )}
        <button
          className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
          onClick={() => signOut(auth)}
        >
          <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-[#FF9900] transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
