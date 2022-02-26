import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { auth } from "../../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState();
  const [signupError, setSignupError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    if (loading) return;
    setLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        router.push("/admin");
        setLoading(false);
      })
      .catch((error) => {
        setLoginError(error.message.split(/[/)]/)[1]);
        setLoading(false);
      });
  };

  const signUp = async (data) => {
    if (loading) return;
    setLoading(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {})
      .catch((error) => {
        setSignupError(error.message.split(/[/)]/)[1]);
        setLoading(false);
      });
    await updateProfile(auth.currentUser, {
      displayName: data.name,
    })
      .then(() => {
        router.push("/admin");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="flex flex-col items-center justify-center">
        {loginForm ? (
          <>
            <h1 className="mt-5 text-2xl font-semibold md:mt-10">
              Admin Login
            </h1>

            <form
              onSubmit={handleSubmit(login)}
              className="my-5 flex w-full max-w-xl flex-col gap-3"
            >
              <div className="flex flex-col gap-1">
                <label className="formlabel">Email</label>
                <input
                  type="email"
                  className="forminput"
                  {...register(
                    "email",
                    { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
                    { required: true }
                  )}
                />
                {errors.email && (
                  <span className="formerror">Invalid Email.</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="formlabel">Password</label>
                <input
                  type="password"
                  className="forminput"
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                  })}
                />
                {errors.password && (
                  <ul className="formerror list-disc">
                    Choose a strong password that meets following criteria :
                    <li className="ml-5">
                      Contains at least one capital letter.
                    </li>
                    <li className="ml-5">
                      Contains at least one small letter.
                    </li>
                    <li className="ml-5">Contains at least one digit.</li>
                    <li className="ml-5">
                      Contains minimum 6 and maximum 15 characters.
                    </li>
                  </ul>
                )}
              </div>

              <input
                className="forminput cursor-pointer bg-yellow-400"
                type="submit"
                value={loading ? "Loading..." : "Submit"}
              />
              <p
                className="cursor-pointer text-right text-xs hover:underline"
                onClick={() => setLoginForm(false)}
              >
                Register here.
              </p>
              <span className="formerror text-center">{loginError}</span>
            </form>
          </>
        ) : (
          <>
            <h1 className="mt-5 text-2xl font-semibold md:mt-10">
              Admin Signup
            </h1>

            <form
              onSubmit={handleSubmit(signUp)}
              className="my-5 flex w-full max-w-xl flex-col gap-3"
            >
              <div className="flex flex-col gap-1">
                <label className="formlabel">Name</label>
                <input
                  type="text"
                  className="forminput"
                  {...register(
                    "name",

                    { required: true }
                  )}
                />
                {errors.name && (
                  <span className="formerror">Invalid Name.</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="formlabel">Email</label>
                <input
                  type="email"
                  className="forminput"
                  {...register(
                    "email",
                    { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
                    { required: true }
                  )}
                />
                {errors.email && (
                  <span className="formerror">Invalid Email.</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="formlabel">Password</label>
                <input
                  type="password"
                  className="forminput"
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                  })}
                />
                {errors.password && (
                  <ul className="formerror list-disc">
                    Choose a strong password that meets following criteria :
                    <li className="ml-5">
                      Contains at least one capital letter.
                    </li>
                    <li className="ml-5">
                      Contains at least one small letter.
                    </li>
                    <li className="ml-5">Contains at least one digit.</li>
                    <li className="ml-5">
                      Contains minimum 6 and maximum 15 characters.
                    </li>
                  </ul>
                )}
              </div>
              <input
                className="forminput cursor-pointer bg-yellow-400"
                type="submit"
                value={loading ? "Loading..." : "Submit"}
              />
              <p
                className="cursor-pointer text-right text-xs hover:underline"
                onClick={() => setLoginForm(true)}
              >
                Login here.
              </p>{" "}
              <span className="formerror text-center">{signupError}</span>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
