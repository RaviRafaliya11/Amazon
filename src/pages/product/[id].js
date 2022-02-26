import { HiStar } from "react-icons/hi";
import Countdown from "react-countdown";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import moment from "moment";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import MainTheme from "../../components/theme/MainTheme";
import { db } from "../../firebase/firebase";
import Link from "next/link";

export default function ProductDetail({ product }) {
  const rndInt = Math.floor(Math.random() * 10) + 1;
  let tomorrowdate = moment().add(1, "days").format("DD MMM YYYY");
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <div className="ml-1">
        {hours}h : {minutes}m : {seconds}s
      </div>
    );
  };

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const addToCart = async () => {
    if (loading) return;
    setLoading(true);
    const q = query(
      collection(db, "users", `${session.user.email}`, "cart"),
      where("productId", "==", `${product.productId}`)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await addDoc(collection(db, "users", `${session.user.email}`, "cart"), {
        description: product.description,
        price: product.price,
        image: product.image,
        productId: product.productId,
        ratings: product.ratings,
        title: product.title,
        quantity: 1,
      });
    }
    setLoading(false);
  };

  return (
    <MainTheme>
      <div className="mx-auto max-w-screen-2xl">
        <div className="p-3">
          <p className="text-xs capitalize">
            <Link href={`/category/${product.category}`}>
              <span className="cursor-pointer hover:underline">
                {product.category}
              </span>
            </Link>
            {` > `} {product.title}
          </p>
        </div>

        <div className="m-1 flex flex-wrap space-y-5 py-8 sm:m-3">
          {/* Left */}

          <img
            className="h-96 w-96 object-contain"
            src={product.image}
            alt=""
          />

          {/* Middle */}
          <div className="mx-1 max-w-2xl sm:mx-5">
            {/* Title, Description and Rating */}
            <>
              <h3 className="text-xl font-bold">{product.title}</h3>
              <p className="my-3">
                <span className="font-bold">Description:</span>{" "}
                {product.description}
              </p>
              <div className="flex items-center">
                {Array(Math.round(product.ratings.rating))
                  .fill()
                  .map((_, i) => (
                    <HiStar key={i} className="h-5 w-5 text-yellow-500" />
                  ))}
                <p className="ml-3 text-blue-500">
                  | {product.ratings.count} <span>ratings</span>
                </p>
              </div>
            </>

            <div className="mt-3 border-t border-gray-300 pt-2 text-gray-600">
              {/* Fake Price */}
              <>
                <p className="text-sm">
                  M.R.P.:{" "}
                  <span className="ml-1 line-through">
                    {" "}
                    ₹{(product.price * rndInt).toFixed(2)}
                  </span>
                </p>
              </>
              {/* Original Price and Timer */}
              <>
                <div className="text-sm">
                  Deal of the Day:{" "}
                  <span className="ml-1 text-lg text-[#B12704]">
                    {" "}
                    ₹{product.price}
                  </span>
                  <div className="my-1 flex">
                    Ends in:
                    <Countdown
                      date={Date.parse(tomorrowdate)}
                      renderer={renderer}
                    />
                  </div>
                  <div className="my-1 flex items-center space-x-3">
                    <p>Prime Product:</p>
                    <img
                      className="h-8 w-8 object-contain"
                      src="/Amazon_Prime.svg"
                      alt=""
                    />
                  </div>
                </div>
              </>

              {/* Percentage */}
              <>
                <div className="text-sm">
                  You Save:{" "}
                  <span className="ml-1 text-[#B12704]">
                    {" "}
                    ₹{(product.price * rndInt - product.price).toFixed(2)} (
                    {Math.round(
                      100 - (product.price / (product.price * rndInt)) * 100
                    )}
                    %) <span className="text-xs">(Inclusive of all taxes)</span>
                  </span>
                </div>
              </>

              {/* Delivery Section */}
              <>
                <div className="mt-5 border-t border-gray-300 text-sm">
                  <p className="mt-1">
                    Free Delivery :{" "}
                    <span className="font-semibold text-black">
                      Between ({moment().add(7, "days").format("ll")} -{" "}
                      {moment().add(10, "days").format("ll")})
                    </span>
                  </p>
                  {product.prime && (
                    <>
                      <p className="mt-1">
                        Next Day Delivery :{" "}
                        <span className="font-semibold text-black">
                          {moment().add(1, "days").format("ll")}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-grow items-start justify-center">
            <button
              onClick={session ? addToCart : signIn}
              className="amazon_button"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </MainTheme>
  );
}

export async function getServerSideProps({ params }) {
  const product = await getDoc(doc(db, "products", `${params.id}`));
  const productsData = { productId: product.id, ...product.data() };
  return {
    props: { product: productsData },
  };
}
