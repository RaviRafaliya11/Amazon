import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import MainTheme from "../components/theme/MainTheme";
export default function FourOFour() {
  const router = useRouter();
  return (
    <MainTheme>
      <div className="flex flex-col items-center justify-center pt-10">
        <Image
          src="/AmazonBlack.svg"
          alt=""
          width={150}
          height={40}
          objectFit="contain"
          className="cursor-pointer"
        />
        <div className="mt-5">
          <p className="text-xl font-semibold text-yellow-600">
            Looking for something?
          </p>
          <p className="mt-1">
            We&apos;re sorry. The Web address you entered is not a functioning
            page on our site.
          </p>
          <p className="mt-1 text-center text-lg">
            Go to Previous{" "}
            <span
              onClick={() => router.back()}
              className="cursor-pointer font-semibold text-blue-600 underline"
            >
              Page{" "}
            </span>
          </p>
        </div>
      </div>
    </MainTheme>
  );
}
