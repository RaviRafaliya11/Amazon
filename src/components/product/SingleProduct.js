import { useRouter } from "next/dist/client/router";
import { HiStar } from "react-icons/hi";
import { useSession, signIn } from "next-auth/react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState } from "react";
import { Fade } from "react-reveal";

export default function SingleProduct({ product }) {
  const router = useRouter();
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
    <Fade>
      <div className="relative z-30 my-5 mx-1 flex flex-col rounded bg-white p-10 shadow-2xl sm:mx-5">
        <p
          onClick={() => router.push(`/category/${product.category}`)}
          className="absolute top-2 right-2 cursor-pointer text-xs italic text-gray-400 hover:text-gray-700 hover:underline"
        >
          {product.category}
        </p>
        <img
          onClick={() => router.push(`/product/${product.productId}`)}
          className="h-[200px] w-[200px] cursor-pointer object-contain transition-all duration-300 ease-in-out hover:scale-105"
          src={product.image}
        />
        <div onClick={() => router.push(`/product/${product.productId}`)}>
          <h4 className="line-clamp-3 my-3 hover:cursor-pointer hover:underline">
            {product.title}
          </h4>
        </div>
        <div className="flex ">
          {Array(Math.round(product.ratings.rating))
            .fill()
            .map((_, i) => (
              <HiStar key={i} className="h-5 w-5 text-yellow-500" />
            ))}
        </div>

        <p className="line-clamp-2 my-2 text-xs">{product.description}</p>
        <div className="mb-5">{product.price}</div>
        {product.prime && (
          <div className="mb-2 flex items-center justify-between space-x-2">
            <img
              className="h-8 w-8 object-contain"
              src="/Amazon_Prime.svg"
              alt=""
            />
            <p className="text-xs text-gray-500">Free Delivery</p>
          </div>
        )}
        <button
          className="amazon_button mt-auto"
          onClick={session ? addToCart : signIn}
        >
          Add to cart
        </button>
      </div>
    </Fade>
  );
}
