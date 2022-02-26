import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import moment from "moment";
import Order from "../components/Order";
import { db } from "../firebase/firebase";
import MainTheme from "../components/theme/MainTheme";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Orders({ orders }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <MainTheme>
      <div className="mx-auto max-w-screen-lg py-10">
        <h1 className="mb-2 border-b border-yellow-400 pb-1.5 text-3xl">
          Your Orders
        </h1>
        {session ? (
          <>
            <h2>Total Orders ({orders.length}) </h2>
            <div className="mt-5 flex flex-col space-y-4">
              {orders.map((order) => (
                <Order order={order} key={order.id} />
              ))}
            </div>
          </>
        ) : (
          <h2>
            Please{" "}
            <span
              onClick={() => router.push("auth/signin")}
              className="cursor-pointer text-yellow-500 underline"
            >
              Sign in
            </span>{" "}
            to See Your Orders
          </h2>
        )}
      </div>
    </MainTheme>
  );
}

export async function getServerSideProps(context) {
  const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

  //get logged in user's credentials
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  //firebase data access
  const stripeOrders = await query(
    getDocs(
      collection(db, "users", `${session?.user.email}`, "orders"),
      orderBy("timestamp", "desc")
    )
  );

  //Stripe orders

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: { orders },
  };
}
