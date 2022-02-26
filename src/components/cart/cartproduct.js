import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { HiStar } from "react-icons/hi";
import { db } from "../../firebase/firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartProduct({ item }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const removeFromCart = async () => {
    if (loading) return;
    setLoading(true);
    await deleteDoc(
      doc(db, "users", `${session.user.email}`, "cart", `${item.id}`)
    );
    setLoading(false);
    toast.info("Product Removed", {
      position: "top-right",
      theme: "colored",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    router.replace(router.asPath);
  };

  const IncreaseQuantity = async () => {
    if (loading || item.quantity > 9) return;
    setLoading(true);
    let newquantity = item.quantity + 1;
    await updateDoc(
      doc(db, "users", `${session.user.email}`, "cart", `${item.id}`),
      {
        quantity: newquantity,
      }
    );
    setLoading(false);
    router.replace(router.asPath);
  };

  const DecreaseQuantity = async () => {
    if (loading || item.quantity == 1) return;
    setLoading(true);
    let newquantity = item.quantity - 1;
    await updateDoc(
      doc(db, "users", `${session.user.email}`, "cart", `${item.id}`),
      {
        quantity: newquantity,
      }
    );
    setLoading(false);
    router.replace(router.asPath);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 border-b border-gray-200 pb-3">
      <ToastContainer />
      <div>
        <img src={item.image} className="h-[200px] w-[200px] object-contain" />
      </div>
      {/* middle */}
      <div className="mx-5 flex w-full max-w-xl flex-col">
        <p className="text-sm md:text-base">{item.title}</p>
        <div className="flex">
          {Array(Math.round(item.ratings.rating))
            .fill()
            .map((_, i) => (
              <HiStar key={i} className="h-5 w-5 text-yellow-500" />
            ))}
        </div>
        <p className="line-clamp-3 my-2 text-xs">{item.description}</p>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>

        {item.prime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">Free Delivery</p>
          </div>
        )}
      </div>
      {/* buttons */}
      <div className="my-auto flex flex-col space-y-2 justify-self-end">
        <div className="flex items-center justify-between">
          <button className="amazon_button" onClick={DecreaseQuantity}>
            -
          </button>
          <p className="font-semibold">{item.quantity}</p>
          <button className="amazon_button" onClick={IncreaseQuantity}>
            +
          </button>
        </div>
        <button className="amazon_button" onClick={removeFromCart}>
          Remove From Cart
        </button>
      </div>
    </div>
  );
}
