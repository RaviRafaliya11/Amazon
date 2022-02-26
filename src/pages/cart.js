import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import MainTheme from "../components/theme/MainTheme";
import { getSession, useSession } from "next-auth/react";
import { db } from "../firebase/firebase";
import CartProduct from "../components/cart/cartproduct";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default function cart({ cart }) {
  const { data: session } = useSession();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price * cart[i].quantity;
    }
    setTotal(totalVal);
  }, [cart]);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const createCheckOutSession = async () => {
    if (loading) return;
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      items: cart,
      email: session.user.email,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };

  return (
    <MainTheme>
      <div className="bg-gray-100">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap-reverse md:flex-nowrap">
          {/* left */}
          <div className="m-2 flex-grow shadow-sm md:m-5">
            <img
              src="https://links.papareact.com/ikj"
              className="h-[250] w-full"
              alt=""
            />
            <div className="flex flex-col space-y-10 bg-white p-5">
              <h1 className="border-b p-4 text-3xl">
                {cart.length === 0 ? (
                  "Your Cart Is Empty."
                ) : (
                  <p className="w-full">
                    Your Cart{" "}
                    <span className="float-right text-lg">
                      ({cart.length} Items)
                    </span>
                  </p>
                )}
              </h1>

              {cart.map((item, index) => (
                <CartProduct key={index} item={item} />
              ))}
            </div>
          </div>

          {/* right */}
          <div className="flex flex-shrink flex-grow flex-col bg-white p-10 shadow-md">
            {cart.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal {cart.length} Items:{" "}
                  <span className="font-bold">( {total})</span>
                </h2>
                <button
                  role="link"
                  onClick={createCheckOutSession}
                  disabled={!session}
                  className={`amazon_button mt-2 ${
                    !session &&
                    "cursor-not-allowed border-gray-200 from-gray-500 to-gray-500 text-white "
                  }`}
                >
                  {!session ? "Sign In to Checkout" : "Proceed To Checkout"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </MainTheme>
  );
}

export async function getServerSideProps(req) {
  const session = await getSession(req);

  const cart = await getDocs(
    collection(db, "users", `${session?.user.email}`, "cart")
  );
  const cartData = cart.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      cart: cartData,
    },
  };
}
